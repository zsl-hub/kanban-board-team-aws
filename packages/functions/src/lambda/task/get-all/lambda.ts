import internal from "stream";
import { ApiResponse } from "../../../model/responses";

import { Task } from "../../../model/Task";

export async function main() {
    
    const result = {
        Items: [
            {
                id : "2137",
                name : "Cokolwiek",
                desc : "Opis",
                columnId : 1
            },
            {
                id : "2138",
                name : "Cokolwiek",
                desc : "Opis",
                columnId : 2
            },
            {
                id : "2139",
                name : "Cokolwiek",
                desc : "Opis",
                columnId : 3
            },
            {
                id : "21310",
                name : "Cokolwiek",
                desc : "Opis",
                columnId : 2
            },
            {
                id : "21311",
                name : "Cokolwiek",
                desc : "Opis",
                columnId : 1
            },
        ]
    } 

    return ApiResponse.ok(result);
}