import { TaskSchema } from "src/model/Task";
import { z } from "zod";

export const UpdateTaskEventSchema = z.object({
    body: TaskSchema.partial().required({id:true})
});

export type UpdateTaskEvent = z.infer<typeof UpdateTaskEventSchema>

/*
"{
  \"id\":\"7e76c64a-7270-4a65-8f17-fe9ac3187b1a\",
  \"name\":\"name\",
  \"columnId\":4,
  \"order\":\"1\"
}"
*/