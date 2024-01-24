import { z } from "zod";

export const getByColumnIdTaskEventSchema = z.object({
    queryStringParameters: z.object({
        columnId: z.string()
    })
});

export type getByColumnIdTaskEvent = z.infer<typeof getByColumnIdTaskEventSchema>