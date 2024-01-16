import { z } from "zod"

const Task = z.object({
    id : z.string().uuid(),
    name : z.string(),
    description : z.string(),
    columnId : z.number(), 
});

export {Task}