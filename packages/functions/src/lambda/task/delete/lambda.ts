import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Task } from "src/model/Task";
import { ApiResponse } from "src/model/responses";
import { TaskRepository } from "src/repositories/taskRepository";
import { z } from "zod";
const getTaskRepository = () => new TaskRepository();

export async function main (e: APIGatewayProxyEventV2) {

    try{
        // checks if id is of a good type according to Task 
        const id = Task.partial().required({id:true}).parse({id: e?.queryStringParameters?.id}).id
        
        // checks if there are any records with given id
        const itemCount = (await getTaskRepository().queryById(id))?.length ?? 0
        if(!itemCount) return ApiResponse.not_found(`Task with id ${id} was not found!`)

        // let's say now we checked all threats (we are smart enough to expect)
        await getTaskRepository().delete(id)
        const response = "Deletion succesful."
        return ApiResponse.ok(response);

    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            return ApiResponse.bad_request(res);
        }
    }
}