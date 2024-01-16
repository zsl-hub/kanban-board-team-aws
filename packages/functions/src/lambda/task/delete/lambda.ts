import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiResponse } from "src/model/responses";

export async function main (e: APIGatewayProxyEventV2) {

    const id = e.body!==undefined?JSON.parse(e.body)?.id:undefined

    return ApiResponse.ok(`Deleted task with id ${id} (clearly theoritically).`);
}