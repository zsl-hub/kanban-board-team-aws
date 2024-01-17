import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DeleteTaskEvent } from "./types";
import { ApiResponse } from "src/model/responses";
import { getTaskRepository } from "src/repositories/taskRepository";
import { ApiError } from "src/model/errors";
import { z } from "zod";
const taskRepository = getTaskRepository()

function getId(e : APIGatewayProxyEventV2){
    try{
        return DeleteTaskEvent.parse(e).queryStringParameters.id 
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            throw new ApiError(400, res.join(";")) 
        }
    }
}

export async function main (e: APIGatewayProxyEventV2) {

    try{
        const itemCount = (await taskRepository.getById(getId(e) as string)) ?? 0
        if(!itemCount) return ApiResponse.notFound(`Task with id ${getId(e)} was not found!`)

        await taskRepository.delete(getId(e) as string)

        const response = "Deletion succesful."
        return ApiResponse.ok(response);

    }catch(err){
        if (err instanceof ApiError) {
            return err.getApiResponse()
        }else{
            throw err
        }
    }   
}    


    