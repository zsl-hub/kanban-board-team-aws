import { addTask, deleteTask, updateTask } from "../api/endpoints";
import { TaskInterface } from "../types";

function addToStack(
  endpoint: string,
  triggeredBy: string,
  task: TaskInterface | string
) {
  if (triggeredBy == "Ctrl+Z") {
    const undoedStack = JSON.parse(
      sessionStorage.getItem("undoedStack") ?? "[]"
    );
    undoedStack.unshift({ originalState: task, action: endpoint });
    sessionStorage.setItem("undoedStack", JSON.stringify(undoedStack));
  } else {
    if (triggeredBy != "Ctrl+Y") sessionStorage.removeItem("undoedStack");
    const changesStack = JSON.parse(
      sessionStorage.getItem("changesStack") ?? "[]"
    );
    changesStack.unshift({ originalState: task, action: endpoint });
    sessionStorage.setItem("changesStack", JSON.stringify(changesStack));
  }
}

export async function undo(tasks: TaskInterface[]) {
  const changesStack = JSON.parse(
    sessionStorage.getItem("changesStack") ?? "[]"
  );

  if (!changesStack.length) return;

  const toUndo = changesStack.shift();
  sessionStorage.setItem("changesStack", JSON.stringify(changesStack));

  const task = JSON.parse(toUndo.originalState);

  switch (toUndo.action) {
    case "add":
      if (!task.id) throw new Error("An id must be provided");
      return await callEndpoint(tasks, "delete", "Ctrl+Z", undefined, task.id);
    case "delete":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint(tasks, "update", "Ctrl+Z", task, undefined);
    case "update":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint(tasks, "update", "Ctrl+Z", task, undefined);
  }
}

export async function redo(tasks: TaskInterface[]) {
  const undoedStack = JSON.parse(sessionStorage.getItem("undoedStack") ?? "[]");

  if (!undoedStack.length) return;

  const toRedo = undoedStack.shift();
  sessionStorage.setItem("undoedStack", JSON.stringify(undoedStack));
  const task = JSON.parse(toRedo.originalState);

  switch (toRedo.action) {
    case "add":
      if (!task.id) throw new Error("An id must be provided");
      return await callEndpoint(tasks, "delete", "Ctrl+Y", undefined, task.id);
    case "delete":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint(tasks, "update", "Ctrl+Y", task, undefined);
    case "update":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint(tasks, "update", "Ctrl+Y", task, undefined);
  }
}

export default async function callEndpoint(
  tasks: TaskInterface[],
  endpoint: string,
  triggeredBy: string,
  task?: TaskInterface,
  id?: string
) {
  switch (endpoint) {
    case "add":
      if (!task) throw new Error("A task must be provided");
      return await addTask(task).then((e) => {
        addToStack(endpoint, triggeredBy, e);
        return [...tasks, JSON.parse(e ?? "") as TaskInterface];
      });
    case "delete":
      if (!id) throw new Error("An id must be provided");
      return await deleteTask(id).then((e) => {
        addToStack(endpoint, triggeredBy, e);
        return tasks.filter((t) => t.id !== id);
      });
    case "update":
      if (!task) throw new Error("A task must be provided");
      return await updateTask(task).then((e) => {
        addToStack(endpoint, triggeredBy, e);
        return tasks.map((t) => (t.id === task.id ? task : t));
      });
  }
}
