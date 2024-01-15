import { ApiResponse } from "src/model/responses";



export async function main() {

    const res = ApiResponse.ok("example");
    return res;
}