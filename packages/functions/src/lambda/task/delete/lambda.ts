import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiResponse } from "src/model/responses";
import { TaskRepository } from "src/repositories/taskRepository";

const getTaskRepository = () => new TaskRepository();

export async function main (e: APIGatewayProxyEventV2) {


    const id = e?.queryStringParameters?.id ?? ""

    const response = await getTaskRepository().delete(id)
    return ApiResponse.ok(response);
}