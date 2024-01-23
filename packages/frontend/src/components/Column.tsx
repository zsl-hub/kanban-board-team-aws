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

import { Droppable } from "react-beautiful-dnd";

import Icon from "./Icon";
import Task from "./Task";
import ModalAddTask from "./ModalAddTask";

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

        <Droppable droppableId={String(column.id)}>
          {(provided) => (
            <Flex
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="tasks-flex"
            >
              {tasksForColumn.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  tasks={tasks}
                  setTasks={setTasks}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>

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
      </Flex>
    </GridItem>
  );
}
