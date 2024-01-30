import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Select,
  LightMode,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import columns from "../../config/columns";
import { useState } from "react";
import { addTask } from "../api/endpoints";
import { v4 as uuidv4 } from "uuid";

import { TaskInterface, ColumnInterface } from "../types";

interface ModalAddTaskProps {
  isOpen: boolean;
  onClose: () => void;
  curColumn: ColumnInterface;
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  tasksForColumn: TaskInterface[];
}

export default function ModalAddTask({
  isOpen,
  onClose,
  curColumn,
  tasks,
  setTasks,
  tasksForColumn,
}: ModalAddTaskProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColumnId, setSelectedColumnId] = useState(curColumn.id);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const toast = useToast();

  function handleAddTask() {
    if (!name) {
      setIsNameEmpty(true);
      return;
    }

    const newTask = {
      id: uuidv4(),
      name: name,
      description: description,
      columnId: selectedColumnId,
      order: tasksForColumn.length,
    };

    const promise = addTask(newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
      })
      .catch((err) => console.error(err));

    toast.promise(promise, {
      success: {
        title: "Task Added Successfully",
        description: "Your new task has been added.",
      },
      error: {
        title: "Unable to Add Task",
        description: "Oops! Something went wrong while adding your task.",
      },
      loading: {
        title: "Adding New Task",
        description: "Hang tight, we're adding your task.",
      },
    });

    setName("");
    setDescription("");
    setSelectedColumnId(curColumn.id);
    setIsNameEmpty(false);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsNameEmpty(false);
        onClose();
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new task</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap="0.75rem">
          <FormControl isInvalid={isNameEmpty}>
            <Input
              variant="filled"
              placeholder="task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Textarea
            variant="filled"
            placeholder="task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            variant="filled"
            value={selectedColumnId}
            onChange={(e) => setSelectedColumnId(Number(e.target.value))}
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.description}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <LightMode>
            <Button colorScheme="teal" onClick={handleAddTask}>
              Add
            </Button>
          </LightMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
