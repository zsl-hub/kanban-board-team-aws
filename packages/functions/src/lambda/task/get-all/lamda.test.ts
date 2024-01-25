import { afterEach,  describe, expect, expectTypeOf, test, vi} from 'vitest';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { main } from "./lambda"
import { Task } from '@kanban-board-team-aws/functions/model/Task';
import TaskRepository from '@kanban-board-team-aws/functions/repositories/taskRepository';

const mockedTaskArray : Task[] = [{id: "01234567-89ab-cdef-0123-456789abcdef",name: "testName",description : "testDesc",columnId: 1, order: 1}];

describe("/task/get-all tests",  ()=>{
    
    afterEach(_=>{
        vi.restoreAllMocks()
    })
    test.each([
        ["an empty array", 
            []
        ],
        ["and a non-empty array",
            mockedTaskArray
        ]
    ])(`should return status code 200 and %s`, async (description, mockedTaskArray) => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "getAll").mockResolvedValue(mockedTaskArray)

        //WHEN
        const result = await main() 

        // THEN
        expect(result?.statusCode).toBe(200)
        expect(typeof JSON.parse(result?.body ?? "")).toBe(typeof mockedTaskArray)
    })

    test("should return status code 500", async () => {
        // GIVEN
        vi.spyOn(TaskRepository.prototype, "getAll").mockRejectedValue(new Error())

        //WHEN
        const result = await main()

        // THEN
        expect(result?.statusCode).toBe(500)
    })
})