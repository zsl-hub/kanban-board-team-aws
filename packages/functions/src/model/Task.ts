import { z } from "zod"

interface Task{
    id : string,
    name : string,
    description : string,
    columnId : number, 
}

const taskSchema : z.ZodType<Task> = z.object({
    id : z.string(),
    name : z.string(),
    description : z.string(),
    columnId : z.number(), 
});

export {Task, taskSchema}