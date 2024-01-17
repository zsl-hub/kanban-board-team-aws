import { ApiResponse } from "src/model/responses";

import { TaskRepository } from "src/repositories/taskRepository";

const getTaskRepository = () => new TaskRepository();

export async function main() {

    const result = await getTaskRepository().getAll()
    return ApiResponse.ok(result);
}