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
    <Flex flexDirection="column" gap="0.75rem">
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </Flex>
  );
}
