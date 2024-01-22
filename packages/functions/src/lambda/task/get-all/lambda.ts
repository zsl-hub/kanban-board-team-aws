import { ApiResponse } from "src/model/responses";

import { getTaskRepository } from "src/repositories/getTaskRepository";

const taskRepository = getTaskRepository();

export async function main() {

    const result = await taskRepository.getAll()
    return ApiResponse.ok(result);
}