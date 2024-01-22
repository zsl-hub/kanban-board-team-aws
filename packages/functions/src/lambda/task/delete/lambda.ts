import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DeleteTaskEventSchema } from "./types";
import { ApiResponse } from "../../../model/responses";
import { getTaskRepository }  from "../../../repositories/getTaskRepository";
import { ApiError } from "../../../model/errors";
import { z } from "zod";
const taskRepository = getTaskRepository()

function getId(e : APIGatewayProxyEventV2): string {
    try{
        return DeleteTaskEventSchema.parse(e).queryStringParameters.id 
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            throw new ApiError(400, res.join(";")) 
        }
        throw err;
    }
}

export async function main (e: APIGatewayProxyEventV2) {

    try{
        const id = getId(e);
        const itemCount = (await taskRepository.getById(id));
        
        if(!itemCount) return ApiResponse.notFound(`Task with id ${getId(e)} was not found!`)

        await taskRepository.delete(getId(e) as string)

        const response = "Deletion succesful."
        return ApiResponse.ok(response);

    }catch(err){
        if (err instanceof ApiError) {
            return err.getApiResponse()
        }
        throw err
    }   
}    


    