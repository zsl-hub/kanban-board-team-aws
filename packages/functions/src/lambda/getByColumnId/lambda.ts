import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiError } from "src/model/errors";


const taskRepository = TaskRepository.getTaskRepository();

export async function main(e: APIGatewayProxyEventV2) {

    try{    
        const columnId = e.queryStringParameters.columnId;
        const result = await taskRepository.getByColumnId(parseInt(columnId));
        return ApiResponse.ok(result);

    }catch(err){
        if (err instanceof ApiError) {
            return err.getApiResponse()
        }
        throw err
    }   
}