import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";


const taskRepository = TaskRepository.getTaskRepository();

export async function main() {

    const result = await taskRepository.getAll()
    return ApiResponse.ok(result);
}