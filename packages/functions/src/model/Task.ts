import { z } from "zod"

export const TaskSchema = z.object({
    id : z.string().uuid(),
    name : z.string(),
    description : z.string(),
    columnId : z.number(), 
});

export type Task = z.infer<typeof TaskSchema>;