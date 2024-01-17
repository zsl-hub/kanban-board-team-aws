import { Task } from "src/model/Task"
export const DeleteTaskDTO = Task.partial().required({id:true})