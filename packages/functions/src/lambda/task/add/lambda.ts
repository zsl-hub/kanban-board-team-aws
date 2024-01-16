import { v4 as uuidv4 } from "uuid";
import { ApiResponse } from "src/model/responses";
import { Task } from "src/model/Task"
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";


export async function main(e: APIGatewayProxyEventV2) {
    const body=JSON.parse(e.body??"")
    try {
        body.id = uuidv4();
        const task = Task.parse(body)
        return ApiResponse.ok(task);
    }catch(err){
        if (err instanceof z.ZodError) {
            return (err.issues.map(e=>`${e.message} at field ${e.path}`));
          }
    }
    
    
}