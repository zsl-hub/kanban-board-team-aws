import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { Task } from "src/model/Task";

export class TaskRepository{
    private dynamoDb = new DynamoDB.DocumentClient();

    public async getAll(){ 
        const params = {
            TableName: Table.Tasks.tableName,
        };
        const result = (await this.dynamoDb.scan(params).promise()).Items?.map(e=>Task.parse(e))
        return result
    }

    public async add(id:string, name:string, description:string, columnId:number){ 
        const params = {
            TableName: Table.Tasks.tableName,
            Item:{
                id: id,
                name: name,
                description: description,
                columnId: columnId,
            }
        };
        return await this.dynamoDb.put(params).promise();
    }

    public async delete(id:string){ 
        const params = {
            TableName: Table.Tasks.tableName,
            Key: {
                id: id,
            }
        };
        return await this.dynamoDb.delete(params).promise();
        // TODO: does not return any data
    }
}