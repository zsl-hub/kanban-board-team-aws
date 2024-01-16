import { v4 as uuidv4 } from "uuid";
import { ApiResponse } from "src/model/responses";
import { Task } from "src/model/Task"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { TaskRepository } from "src/repositories/taskRepository";
const getTaskRepository = () => new TaskRepository();

export async function main(e: APIGatewayProxyEventV2) {
    const body=JSON.parse(e.body??"")
    try {
        body.id = uuidv4();
        const task = Task.parse(body)
        
        await getTaskRepository().add(task);
        const res = "Added task to the table."
        return ApiResponse.ok(res)
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            return ApiResponse.not_found(res);
        }
    }
}