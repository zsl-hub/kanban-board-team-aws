import { afterEach,  describe, expect, test, vi} from 'vitest';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main } from "./lambda"
import { Task } from '@kanban-board-team-aws/functions/model/Task';
import TaskRepository from '@kanban-board-team-aws/functions/repositories/taskRepository';

const taskMock : Task[]= [{id: "7e76c64a-7270-4a65-8f17-fe9ac3187b1a",name: "name",description : "testDesc",columnId: 1, order: 1}];

describe("/task/getByColumnId tests", ()=>{

    afterEach(_=>{
        vi.restoreAllMocks()
    })

    test(`should return status code 200 and tasks with provided columnId`, async ()=>{


        
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "getByColumnId").mockResolvedValue(taskMock)

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                columnId: taskMock[0].columnId.toString(),
            }
        } as any

        // WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode).toBe(200)
        expect(JSON.parse(result?.body ?? "")).toStrictEqual(taskMock)
    })

    test.each([
        ["missing body fields", 
            {a: "1"}
        ],
        ["incorrect body fields",
            {
                columnId: "this shouldn't be a string",
            }
        ]
    ])(`should return status code 400 - %s`, async (description, body)=>{       
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "getByColumnId").mockResolvedValue(taskMock)

        const event: APIGatewayProxyEventV2 = {
            body: JSON.stringify(body)
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode).toBe(400)
    })

    test("should return status code 500", async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "getByColumnId").mockRejectedValue(undefined)

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                columnId: taskMock[0].columnId.toString()
            }
        } as any

        //WHEN
        const result = await main(event)

        // THEN
        expect(result?.statusCode).toBe(500)
    })
})