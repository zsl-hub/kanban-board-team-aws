import { afterEach,  describe, expect, test, vi} from 'vitest';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main } from "./lambda"
import { Task } from '@kanban-board-team-aws/functions/model/Task';
import TaskRepository from '@kanban-board-team-aws/functions/repositories/taskRepository';

const requestBodyMock = {name: "testName",description : "testDesc",columnId: 1} as Task;

describe("/task/add tests",  ()=>{
    
    afterEach(_=>{
        vi.restoreAllMocks()
    })
    
    test(`should return status code 200`, async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "add").mockResolvedValue()

        const event: APIGatewayProxyEventV2 = {
            body: JSON.stringify(requestBodyMock)
        } as any
        //WHEN
        const result = await main(event) 

        // THEN
        expect(result?.statusCode ?? 0).toBe(200)
        expect(JSON.parse(result?.body ?? "")).toBe(`Added task to the table.`)
})

    test.each([
        ["missing body fields", 
            {a: "1"}
        ],
        ["incorrect body fields",
            {
                name: requestBodyMock.name,
                description: requestBodyMock.description,
                columnId: "this shouldn't be a string",
            }
        ]
    ])("should return status code 400 - %s", async (description, body)=>{       
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "add").mockResolvedValue()
        
        const event: APIGatewayProxyEventV2 = {
            body: JSON.stringify(body)
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(400)
    })

    test("should return status code 500", async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "add").mockRejectedValue(undefined)

        const event: APIGatewayProxyEventV2 = {
            body: JSON.stringify(requestBodyMock)
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode ?? 0).toBe(500)
    })
})