import {describe, expect, test, jest} from '@jest/globals';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main as DeleteTask } from "./lambda"
import { Task } from "../../../model/Task"
import TaskRepository from "../../../repositories/taskRepository";

jest.mock('../../../repositories/taskRepository', () => {
    return function(){
        return {
            getById: jest.fn(),
            delete: jest.fn(),
        }
    }
});

  // jest.mock('../../../repositories/taskRepository')

describe("/task/delete tests",  ()=>{

    test("should return 400", async ()=>{       
        // GIVEN
        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                a: "1"
            }
        } as any

        //WHEN
        const result = await DeleteTask(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(400)
    })

    test("should return 200", async () => {
        // GIVEN
        const taskMock = {id: "01234567-89ab-cdef-0123-456789abcdef",name: "testName",description : "testDesc",columnId: 1,} as Task;
        
        // const TaskRepositoryMock = TaskRepository as jest.Mock
        // TaskRepositoryMock.mockImplementationOnce(()=>({
        //     getById: jest.fn().mockImplementation(_=>taskMock)
        // }))
    

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                id: taskMock.id
            }
        } as any

        //WHEN
        const result = await DeleteTask(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(200)
        expect(result?.body ?? "").toBe("Deletion succesful.")
        
    })
})