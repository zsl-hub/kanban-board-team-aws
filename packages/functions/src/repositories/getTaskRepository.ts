import TaskRepository from "./taskRepository";
export const getTaskRepository = (): TaskRepository => new TaskRepository();
