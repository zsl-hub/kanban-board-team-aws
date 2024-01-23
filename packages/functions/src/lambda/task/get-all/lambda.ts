import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { ApiError } from "@kanban-board-team-aws/functions/model/errors";


const taskRepository = TaskRepository.getTaskRepository();

export async function main() {

    try{
        const result = await taskRepository.getAll()
        return ApiResponse.ok(result);

    }catch(err){
        if (err instanceof ApiError) {
            return err.getApiResponse()
        }
        return new ApiError(500, (err as Error)?.message).getApiResponse()
    }   
}    