import { Flex } from "@chakra-ui/react";
import TaskComponent from "./Task";

interface Task {
  id: number;
  name: string;
  description: string;
  columnId: number;
}

interface TasksProps {
  tasksForColumn: Task[];
}

export default function Tasks({ tasksForColumn }: TasksProps) {
  return (
    <Flex
      flexDirection="column"
      gap="1rem"
      maxH={{ lg: "800px", md: "320px", sm: "320px" }}
      overflowY="auto"
    >
      {tasksForColumn.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </Flex>
  );
}
