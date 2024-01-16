import { Flex } from "@chakra-ui/react";
import TaskComponent from "./Task";

interface Task {
  id: number;
  name: string;
  description: string;
  columnId: number;
}

interface TaskProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TaskProps) {
  return (
    <Flex
      flexDirection="column"
      gap="1rem"
      maxH={{ lg: "800px", md: "320px", sm: "320px" }}
      overflowY="auto"
    >
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </Flex>
  );
}
