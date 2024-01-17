import { Flex } from "@chakra-ui/react";
import TaskComponent from "./Task";
import { TaskInterface } from "../types";

interface TasksProps {
  tasksForColumn: TaskInterface[];
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
