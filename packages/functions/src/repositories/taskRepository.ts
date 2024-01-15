import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

export class TaskRepository{
    private static dynamoDb = new DynamoDB.DocumentClient();

    public static async getAll(){ 
        const params = {
            TableName: Table.Tasks.tableName,
        };
        const result = await this.dynamoDb.scan(params).promise();
        return result
        // TODO: Does not return any data
    }

    public static async add(id:string, name:string, description:string, columnId:number){ 
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

    public static async delete(id:string){ 
        const params = {
            TableName: Table.Tasks.tableName,
            Key: {
                id: id,
            }
        };
        return await this.dynamoDb.delete(params, function(err, data) {
            if (err) return err; // an error occurred
            else     return data;           // successful response
          }).promise();
        // TODO: on success does not return any data (but idk if it should)
    }
}