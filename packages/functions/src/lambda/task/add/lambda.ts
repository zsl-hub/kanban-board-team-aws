import { TaskSchema } from "@kanban-board-team-aws/functions/model/Task";
import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "@kanban-board-team-aws/functions/model/errors";
import { b } from "vitest/dist/suite-MFRDkZcV";


const taskRepository = TaskRepository.getTaskRepository();

export async function main(e: APIGatewayProxyEventV2) {
    const body=JSON.parse(e.body??"")
    try {
        body.id = uuidv4();
        const tasksInColumn = (await taskRepository.getByColumnId(body.columnId))
        if(body?.order === undefined){
            body.order = tasksInColumn.length
        }else{
            body.order = body.order>tasksInColumn.length?tasksInColumn.length:body.order
            body.order = body.order<0?0:body.order
        }

        const task = TaskSchema.parse(body)
        
        if (tasksInColumn.length){
            tasksInColumn.map((e) => {
                if (e.order >= task.order) e.order++;
                    return e;
            });
            taskRepository.batchWrite(tasksInColumn);
        } 

        await taskRepository.put(task);
        return ApiResponse.ok(task)
        
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            const apiError = new ApiError(400, res.join(";"))
            return apiError.getApiResponse() 
        }
        const apiError = new ApiError(500, (err as Error)?.message)
        return apiError.getApiResponse()
    }
}