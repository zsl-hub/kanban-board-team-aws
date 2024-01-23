import {afterEach, describe, expect, test, vi} from 'vitest';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import main from "./lambda"
import { Task } from '@kanban-board-team-aws/functions/model/Task';


describe("/task/delete tests",  ()=>{

    test("should return 400", async ()=>{       
        // GIVEN
        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                a: "1"
            }
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(400)
    })

    // test("should return 200", async () => {
    //     // GIVEN
    //     const taskMock = {id: "01234567-89ab-cdef-0123-456789abcdef",name: "testName",description : "testDesc",columnId: 1,} as Task;
        
    //     const event: APIGatewayProxyEventV2 = {
    //         queryStringParameters: {
    //             id: taskMock.id
    //         }
    //     } as any

    //     //WHEN
    //     const result = await main(event)

    //     // THEN
    //     expect(result?.statusCode ?? 0).toBe(200)
    //     expect(result?.body ?? "").toBe("Deletion succesful.")
        
    // })
})