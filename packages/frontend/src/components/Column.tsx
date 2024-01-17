import {
  Flex,
  Button,
  Card,
  CardHeader,
  GridItem,
  Text,
  useDisclosure,
  LightMode,
} from "@chakra-ui/react";
import Icon from "./Icon";
import ModalAddTask from "./ModalAddTask";
import Tasks from "./Tasks";

import { TaskInterface, ColumnInterface } from "../types";

interface ColumnProps {
  column: ColumnInterface;
  bgColor: string;
  tasks: TaskInterface[];
  tasksForColumn: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}

export default function Column({
  column,
  bgColor,
  tasksForColumn,
  tasks,
  setTasks,
}: ColumnProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem bg={bgColor} className="column">
      <Flex flexDirection="column" gap="1rem">
        <Card w="full">
          <CardHeader className="column-header">
            <Icon color={column.statusColor} />
            <Text as="b">{column.description}</Text>
          </CardHeader>
        </Card>

        <Tasks
          tasksForColumn={tasksForColumn}
          tasks={tasks}
          setTasks={setTasks}
        />
      </Flex>

      <LightMode>
        <Button onClick={onOpen} colorScheme="teal" w="5">
          +
        </Button>
      </LightMode>

      <ModalAddTask
        isOpen={isOpen}
        onClose={onClose}
        curColumn={column}
        tasks={tasks}
        setTasks={setTasks}
      />
    </GridItem>
  );
}
