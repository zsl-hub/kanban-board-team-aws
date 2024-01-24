import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiError } from "src/model/errors";
import { z } from "zod"
import { getByColumnIdTaskEventSchema } from "./types";

const taskRepository = TaskRepository.getTaskRepository();

function getColumnId(e : APIGatewayProxyEventV2): string {
    const columnId = getByColumnIdTaskEventSchema.parse(e).queryStringParameters.columnId.toString()
    return columnId
}

export async function main(e: APIGatewayProxyEventV2) {

    try{    
        const columnId = parseInt(getColumnId(e));
        if (Number.isNaN(columnId)) return ApiResponse.badRequest(`Expected number, received string at field queryStringParameters,columnId`)
        const itemCount = (await taskRepository.getByColumnId(columnId));
        if(!itemCount) return ApiResponse.notFound(`No task with columnId ${getColumnId(e)} was not found!`)

        const result = await taskRepository.getByColumnId(columnId)

        return ApiResponse.ok(result);

    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            const apiError = new ApiError(400, res.join(";")) 
            return apiError.getApiResponse()
        }   
        if (err instanceof ApiError) {
            return err.getApiResponse()
        }
        return new ApiError(500, (err as Error)?.message).getApiResponse()
    }  
}