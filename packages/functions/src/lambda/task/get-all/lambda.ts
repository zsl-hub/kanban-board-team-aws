import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import internal from "stream";
import { ApiResponse } from "src/model/responses";

import { Task } from "src/model/Task";
import { TaskRepository } from "src/repositories/taskRepository";

export async function main() {

    const result = await TaskRepository.getAll()
    return ApiResponse.ok(result);
}