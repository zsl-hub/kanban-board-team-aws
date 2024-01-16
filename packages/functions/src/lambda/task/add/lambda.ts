import { v4 as uuidv4 } from "uuid";
import { ApiResponse } from "src/model/responses";
import { taskSchema } from "src/model/Task"
import { APIGatewayProxyEventV2 } from "aws-lambda";


export async function main(e: APIGatewayProxyEventV2) {
    const body=JSON.parse(e.body??"")

    const task = {
        id : uuidv4(),
        name : body?.name,
        description : body?.description,
        columnId : parseInt(body?.columnId),
    }

    taskSchema.parse(task);
    
    return ApiResponse.ok(task);
}