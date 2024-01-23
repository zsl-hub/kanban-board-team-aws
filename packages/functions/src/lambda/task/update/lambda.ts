import { TaskSchema } from "@kanban-board-team-aws/functions/model/Task";
import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";


const taskRepository = TaskRepository.getTaskRepository();

export async function main(e: APIGatewayProxyEventV2) {
    const body=JSON.parse(e.body??"")
    try {
        const itemCount = taskRepository.getById(body.id)
        if (!itemCount) return ApiResponse.notFound(`Task with id ${body.id} was not found!`);

        const task = TaskSchema.parse(body)
        await taskRepository.add(task);
        const res = "Updated task."
        return ApiResponse.ok(res)
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            return ApiResponse.notFound(res);
        }
    }
}