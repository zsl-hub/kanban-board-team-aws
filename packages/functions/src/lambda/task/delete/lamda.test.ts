import {describe, expect, test, jest} from '@jest/globals';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main as DeleteTask } from "./lambda"
import { Table, TableResources } from 'sst/node/table';

describe("/task/delete tests",  ()=>{

    test("should return 400", async ()=>{
       
        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                a: "1"
            }
        } as any

        const result = await DeleteTask(event)


        expect(result?.statusCode ?? 0).toBe(400)
    })
})