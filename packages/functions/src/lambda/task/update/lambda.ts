import { TaskSchema } from "@kanban-board-team-aws/functions/model/Task";
import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import TaskRepository from "@kanban-board-team-aws/functions/repositories/taskRepository";
import { z } from "zod";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiError } from "src/model/errors";
import { UpdateTaskEventSchema } from "./types";

const taskRepository = TaskRepository.getTaskRepository();

export async function main(e: APIGatewayProxyEventV2) {
  try {
    e.body = JSON.parse(e.body ?? "");
    const body = UpdateTaskEventSchema.parse(e).body;
    const oldTask = await taskRepository.getById(body.id);
    if (!oldTask)
      return ApiResponse.notFound(`Task with id ${body.id} was not found!`);
    const newTask = TaskSchema.parse({ ...oldTask, ...body });

    if (
      newTask.columnId != oldTask.columnId ||
      newTask.order != oldTask.order
    ) {
      const extendedQuery = {
        fields: {
          ":id": newTask.id,
        },
        query: "and not id = :id",
      } as any;

      // Aktualizacja oryginalnej kolumny
      const oldColumnTasks = await taskRepository.getByColumnId(
        oldTask.columnId,
        extendedQuery
      );
      if (oldColumnTasks.length){
        oldColumnTasks.map((e) => {
          if (e.order > oldTask.order) e.order--;
          return e;
        });
        taskRepository.batchWrite(oldColumnTasks);
      }
      

      // Aktualizacja kolumny docelowej
      const newColumnTasks = await taskRepository.getByColumnId(
        newTask.columnId,
        extendedQuery
      );
      newTask.order = newTask.order>newColumnTasks.length?newColumnTasks.length:newTask.order  // protects from setting too big order 
      newTask.order = newTask.order<0?0:newTask.order  // protects from setting too low order 
      if (newColumnTasks.length){
        newColumnTasks.map((e) => {
          if (e.order >= newTask.order) e.order++;
          return e;
        });
        taskRepository.batchWrite(newColumnTasks);
      } 
    }
      

    await taskRepository.put(newTask);

    const res = "Updated task.";
    return ApiResponse.ok(res);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const res = err.issues.map((e) => `${e.message} at field ${e.path}`);
      const apiError = new ApiError(400, res.join(";"));
      return apiError.getApiResponse();
    }
    if (err instanceof ApiError) {
      return err.getApiResponse();
    }
    return new ApiError(500, (err as Error)?.message).getApiResponse();
  }
}
