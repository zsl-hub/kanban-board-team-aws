import { addTask, deleteTask, fetchAllTasks, updateTask } from "../api/endpoints";
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

export async function undo() {
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
      return await callEndpoint("delete", "Ctrl+Z", undefined, task.id);
    case "delete":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint("add", "Ctrl+Z", task, undefined);
    case "update":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint("update", "Ctrl+Z", task, undefined);
  }
}

export async function redo() {
  const undoedStack = JSON.parse(sessionStorage.getItem("undoedStack") ?? "[]");

  if (!undoedStack.length) return;

  const toRedo = undoedStack.shift();
  sessionStorage.setItem("undoedStack", JSON.stringify(undoedStack));
  const task = JSON.parse(toRedo.originalState);

  switch (toRedo.action) {
    case "add":
      if (!task.id) throw new Error("An id must be provided");
      return await callEndpoint("delete", "Ctrl+Y", undefined, task.id);
    case "delete":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint("add", "Ctrl+Y", task, undefined);
    case "update":
      if (!task) throw new Error("A task must be provided");
      return await callEndpoint("update", "Ctrl+Y", task, undefined);
  }
}

export default async function callEndpoint(
  endpoint: string,
  triggeredBy: string,
  task?: TaskInterface,
  id?: string
) {
  switch (endpoint) {
    case "add":
      if (!task) throw new Error("A task must be provided");
      return await addTask(task).then(async (e) => {
        addToStack(endpoint, triggeredBy, e);
        return await fetchAllTasks()
      });
    case "delete":
      if (!id) throw new Error("An id must be provided");
      return await deleteTask(id).then(async (e) => {
        if(e)
        addToStack(endpoint, triggeredBy, e);
        return await fetchAllTasks()
      });
    case "update":
      if (!task) throw new Error("A task must be provided");
      return await updateTask(task).then(async (e) => {
        addToStack(endpoint, triggeredBy, JSON.stringify(JSON.parse(e).oldTask));
        return await fetchAllTasks()
      });
  }
}
