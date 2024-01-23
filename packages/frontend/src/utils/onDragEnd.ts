import { DropResult } from "react-beautiful-dnd";
import { TaskInterface } from "../types";
import columnsFromConfig from "../../config/columns";

export default function onDragEnd(
  result: DropResult,
  tasks: TaskInterface[],
  setTasks: (tasks: TaskInterface[]) => void
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
      const [removed] = newStartTasks.splice(source.index, 1);
      removed.columnId = endColumn.id;

      const newFinishTasks = Array.from(finishTasks);
      newFinishTasks.splice(destination.index, 0, removed);

      const otherTasks = tasks.filter(
        (task) =>
          task.columnId !== startColumn.id && task.columnId !== endColumn.id
      );

      const newTasks = [...otherTasks, ...newStartTasks, ...newFinishTasks];

      setTasks(newTasks);
    } else {
      const newTasks = Array.from(startTasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const otherTasks = tasks.filter(
        (task) => task.columnId !== startColumn.id
      );

      const updatedTasks = [...otherTasks, ...newTasks];

      setTasks(updatedTasks);
    }
  }
}
