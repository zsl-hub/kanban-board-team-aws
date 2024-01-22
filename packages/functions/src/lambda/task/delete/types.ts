import { z } from "zod";

export const DeleteTaskEventSchema = z.object({
    queryStringParameters: z.object({
        id: z.string().uuid(),
    })
});

export type DeleteTaskEvent = z.infer<typeof DeleteTaskEventSchema>