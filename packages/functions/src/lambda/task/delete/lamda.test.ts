import { afterEach,  describe, expect, test, vi} from 'vitest';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main } from "./lambda"
import { Task } from '@kanban-board-team-aws/functions/model/Task';
import TaskRepository from '@kanban-board-team-aws/functions/repositories/taskRepository';

const taskMock = {id: "01234567-89ab-cdef-0123-456789abcdef",name: "testName",description : "testDesc",columnId: 1,} as Task;

describe("/task/delete tests",  ()=>{
    
    afterEach(_=>{
        vi.restoreAllMocks()
    })
    
    test("should return 200", async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "delete").mockResolvedValue()
        vi.spyOn(TaskRepository.prototype, "getById").mockResolvedValue(taskMock)

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                id: taskMock.id
            }
        } as any

        //WHEN
        const result = await main(event) 

        // THEN
        expect(result?.statusCode ?? 0).toBe(200)
        expect(result?.body ?? "").toBe(`"Deletion succesful."`) //quite interesting... when we want it to be a string we have to add "" to it lol
    })

    test.each([
        ["missing parameters", {a: "1"}],
        ["incorrect parameters",{id: "that-is-not-a-correct-uuid"}]
    ])("should return 400 - %s", async (description, queryStringParameters)=>{       
        // GIVEN
        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: queryStringParameters
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(400)
    })

    test("should return 404", async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "delete").mockResolvedValue()
        vi.spyOn(TaskRepository.prototype, "getById").mockResolvedValue(undefined)

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                id: taskMock.id
            }
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(404)
    })

    test("should return 500", async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "delete").mockResolvedValue()
        vi.spyOn(TaskRepository.prototype, "getById").mockRejectedValue(undefined)

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                id: taskMock.id
            }
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(500)
    })
})