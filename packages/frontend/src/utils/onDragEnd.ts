import { DropResult } from "react-beautiful-dnd";
import { TaskInterface } from "../types";
import columnsFromConfig from "../../config/columns";
import { updateTask } from "../api/endpoints";

export default async function onDragEnd(
  result: DropResult,
  tasks: TaskInterface[],
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>
) {
  const columns = columnsFromConfig;

  const { source, destination } = result;

  if (!destination) {
    return;
  }

  if (
    source.droppableId === destination.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const startColumn = columns.find(
    (column) => column.id === Number(source.droppableId)
  );
  const endColumn = columns.find(
    (column) => column.id === Number(destination.droppableId)
  );

  if (startColumn && endColumn) {
    const startTasks = tasks.filter((task) => task.columnId === startColumn.id);
    const finishTasks = tasks.filter((task) => task.columnId === endColumn.id);

    if (startColumn !== endColumn) {
      const newStartTasks = Array.from(startTasks);
      const [movedTask] = newStartTasks.splice(source.index, 1);

      movedTask.columnId = endColumn.id;
      movedTask.order = destination.index;

      const newFinishTasks = Array.from(finishTasks);
      newFinishTasks.splice(destination.index, 0, movedTask);

      const otherTasks = tasks.filter(
        (task) =>
          task.columnId !== startColumn.id && task.columnId !== endColumn.id
      );

      const newTasks = [...otherTasks, ...newStartTasks, ...newFinishTasks];

      updateTask(movedTask)
        .then(() => setTasks(newTasks))
        .catch((err) => console.error(err));
      setTasks(newTasks);
    } else {
      const newStartTasks = Array.from(startTasks);
      const [movedTask] = newStartTasks.splice(source.index, 1);

      movedTask.columnId = endColumn.id;
      movedTask.order = destination.index;

      newStartTasks.splice(destination.index, 0, movedTask);

      const newTasks = [
        ...tasks.filter((task) => task.columnId !== startColumn.id),
        ...newStartTasks.sort((a, b) => a.order - b.order),
      ];

      updateTask(movedTask)
        .then(() => setTasks(newTasks))
        .catch((err) => console.error(err));
      setTasks(newTasks);
    }
  }
}
