import { z } from "zod";

export const DeleteTaskEvent = z.object({
    queryStringParameters: z.object({
        id: z.string().uuid(),
    })
});