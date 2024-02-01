import {
  Flex,
  Button,
  Card,
  CardHeader,
  GridItem,
  Text,
  useDisclosure,
  LightMode,
  Badge,
  Circle,
} from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
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
            <Flex gap="0.25rem">
              <Icon color={column.statusColor} />

              <Text as="b">{column.description}</Text>
            </Flex>

            <Circle>
              <Badge bg="teal" color="white">
                {tasksForColumn.length}
              </Badge>
            </Circle>
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
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  <Task
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    index={index}
                  />
                </motion.div>
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
          tasksForColumn={tasksForColumn}
        />
      </Flex>
    </GridItem>
  );
}
