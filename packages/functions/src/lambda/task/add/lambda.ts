import { ApiResponse } from "src/model/responses";



export async function main(e: any) {
    let body = e.queryStringParameters
    if(typeof(e.body) == typeof("string")) body=JSON.parse(e.body) //handling stringified body

    const task = {
        name : body.name,
        description : body.description,
        columnId : parseInt(body.columnId),
    }
    return ApiResponse.ok(task);

}