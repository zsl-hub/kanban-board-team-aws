import { afterEach,  describe, expect, test, vi} from 'vitest';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main } from "./lambda"
import { Task } from '@kanban-board-team-aws/functions/model/Task';
import TaskRepository from '@kanban-board-team-aws/functions/repositories/taskRepository';

const taskMock = {id: "7e76c64a-7270-4a65-8f17-fe9ac3187b1a",name: "name",description : "testDesc",columnId: 1, order: 1} as Task;

describe("/task/update tests", ()=>{
    test(`Should return status code 200 and "Updated task" message`, async ()=>{
        vi.spyOn(TaskRepository.prototype, "put").mockResolvedValue()

        const event: APIGatewayProxyEventV2 = {
            queryStringParameters: {
                id: taskMock.id,
                name: taskMock.name,
                description: taskMock.description,
                columnId: taskMock.columnId,
                order: taskMock.order,
            }
        } as any

        const result = await main(event)

        expect(result?.statusCode ?? 0).toBe(200)
        expect(JSON.parse(result?.body ?? "")).toBe(`Updated task.`)

        expect(result?.statusCode ?? 0).toBe(500)
    })
})