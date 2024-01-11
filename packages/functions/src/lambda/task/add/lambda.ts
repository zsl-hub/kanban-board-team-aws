import { ApiResponse } from "/home/user/kanban-board-team-aws/packages/functions/src/model/responses";



export async function main() {

    const res = ApiResponse.ok("example");
    return res;
}