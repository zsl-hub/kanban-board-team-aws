import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { Task, TaskSchema } from "../model/Task";

export default class TaskRepository{

    private dynamoDb;

    constructor(dynamoDb: DynamoDB.DocumentClient){
        this.dynamoDb = dynamoDb
    }

    public static getTaskRepository() {
        const dynamoDb = new DynamoDB.DocumentClient();
        return new TaskRepository(dynamoDb);
    }

    public async getAll(): Promise<Task[]> { 
        const params = {
            TableName: Table.Tasks.tableName,
        };
        const dbResponse = await this.dynamoDb.scan(params).promise()
        const result = dbResponse.Items?.map(e=>TaskSchema.parse(e) as Task)
        result?.sort((a,b)=>a.order-b.order)
        return result ?? [];
    }

    public async getById(id:string): Promise<Task | undefined> {
        const params = {
            TableName: Table.Tasks.tableName,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            }
        }
        const dbResponse = await this.dynamoDb.query(params).promise()
        if(dbResponse.Count??0 >1) console.log(`FOUND MORE THAN ONE ITEMS WITH ID ${id}`);
        const result = dbResponse.Items?.map(e=>TaskSchema.parse(e))[0]
        return result
    }

    public async put(task : Task): Promise<void>{ 
        const params = {
            TableName: Table.Tasks.tableName,
            Item:task,
        };
        await this.dynamoDb.put(params).promise();
    }

    public async getByColumnId(columnId: number, extendedQuery?: {fields: {}, query: string}): Promise<Task[]> {
        const params = {
            TableName: Table.Tasks.tableName,
            FilterExpression: `columnId = :columnId ${extendedQuery?.query??""}`,
            ExpressionAttributeValues: {...{
                ":columnId" : columnId,
                ...extendedQuery?.fields??{},
            }}
        }
        const dbResponse = await this.dynamoDb.scan(params).promise()
        const result = dbResponse.Items?.map(e=>TaskSchema.parse(e) as Task)
        result?.sort((a,b)=>a.order-b.order)
        return result ?? [];
    }

    public async batchWrite(tasks: Task[]){
        const params = {
            RequestItems: {
                [(Table.Tasks.tableName)] :
                    tasks.map(e=>(
                        {
                            PutRequest: {
                                Item: e
                            }
                        }
                    ))
            }
        }
        await this.dynamoDb.batchWrite(params).promise()
    }

    public async delete(id:string): Promise<void> { 
        const params = {
            TableName: Table.Tasks.tableName,
            Key: {
                id: id,
            }
        };
        await this.dynamoDb.delete(params).promise();
    }
}

