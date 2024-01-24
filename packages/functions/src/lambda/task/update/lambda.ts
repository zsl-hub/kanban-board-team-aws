import { TaskSchema } from "@kanban-board-team-aws/functions/model/Task";
import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiError } from "src/model/errors";


const taskRepository = TaskRepository.getTaskRepository();

export async function main(e: APIGatewayProxyEventV2) {
        
    try {
        const body=JSON.parse(e.body??"")
        const task = TaskSchema.parse(body)
        const itemCount = taskRepository.getById(body.id)
        if (!itemCount) return ApiResponse.notFound(`Task with id ${body.id} was not found!`);

        
        await taskRepository.put(task);
        const res = "Updated task."
        return ApiResponse.ok(res)
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            const apiError = new ApiError(400, res.join(";")) 
            return apiError.getApiResponse()
        }   
        if (err instanceof ApiError) {
            return err.getApiResponse()
        }
        return new ApiError(500, (err as Error)?.message).getApiResponse()
    }
}