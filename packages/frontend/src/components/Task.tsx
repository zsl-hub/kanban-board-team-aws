import {
  Card,
  CardHeader,
  Text,
  Button,
  CardBody,
  useColorModeValue,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

import { Draggable } from "react-beautiful-dnd";

import { useState } from "react";
import colors from "../../config/colors";
import ModalRemoveTask from "./ModalRemoveTask";

import { TaskInterface } from "../types";
import DrawerEditTask from "./DrawerEditTask";

interface TaskProps {
  task: TaskInterface;
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  index: number;
}

export default function Task({ task, tasks, setTasks, index }: TaskProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [name] = useState(task.name);
  const [description] = useState(task.description || "");

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const value = useColorModeValue(colors.lightGray, colors.veryDarkGray);

  const optimalDescriptionLength = 80;
  const descriptionLength = task?.description?.length ?? 0;
  const shortenedDescription = task?.description
    ?.split(" ")
    .slice(0, 15)
    .join(" ");

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  function handleUpdateTask(updatedTask: TaskInterface) {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontWeight="500"
            borderBottom={`1px solid ${value}`}
          >
            <Text>{task.name}</Text>

            <Flex flexDirection="column" gap="0.5rem">
              <Button variant="outline" size="xs" onClick={onModalOpen}>
                X
              </Button>

              <Button variant="outline" size="xs" onClick={onDrawerOpen}>
                ...
              </Button>
            </Flex>

            <DrawerEditTask
              isOpen={isDrawerOpen}
              onClose={onDrawerClose}
              task={task}
              name={name}
              description={description}
              onUpdateTask={handleUpdateTask}
            />

            <ModalRemoveTask
              isOpen={isModalOpen}
              onClose={onModalClose}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          </CardHeader>

          {task?.description && (
            <CardBody
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap="0.5rem"
            >
              <Text>
                {descriptionLength > optimalDescriptionLength
                  ? isExpanded
                    ? task.description
                    : shortenedDescription
                  : task.description}
              </Text>

              {descriptionLength > optimalDescriptionLength && (
                <Button
                  size="s"
                  fontSize="s"
                  variant="outline"
                  padding="0.2em 0.5em"
                  onClick={handleExpand}
                >
                  {isExpanded ? "show less" : "show more"}
                </Button>
              )}
            </CardBody>
          )}
        </Card>
      )}
    </Draggable>
  );
}
