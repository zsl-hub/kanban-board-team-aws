import { Task } from "../model/Task";

const fetchAllTasks = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/task/get-all`);
  return await response.json();
};

const addTask = async (task: Task) => {
  const params = {
    name: task.name,
    description: task.description,
    columnId: task.columnId,
    order: task.order,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(params),
  };
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/task/add`,
    options
  );
  return await response.text();
};

const deleteTask = async (id: string) => {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/task/delete?id=${id}`,
    options
  );
  return await response.text();
};

const updateTask = async (task: Task) => {
  const params = {
    id: task.id,
    name: task.name,
    description: task.description,
    columnId: task.columnId,
    order: task.order,
  };
  const options = {
    method: "PUT",
    body: JSON.stringify(params),
  };
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/task/update`,
    options
  );
  return await response.text();
};

export { fetchAllTasks, addTask, deleteTask, updateTask };
