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
} from "@chakra-ui/react";
import columns from "../../config/columns";
import { useState } from "react";
import { addTask } from "../api/endpoints";

interface ModalAddTaskProps {
  isOpen: boolean;
  onClose: () => void;
  curColumn: string;
}

export default function ModalAddTask({
  isOpen,
  onClose,
  curColumn,
  tasks,
  setTasks,
}: ModalAddTaskProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState(curColumn);

  function handleAddTask() {
    const newTask = {
      name: name,
      description: description,
      columnId: column.id,
    };
    addTask(newTask)
      .then((res) => console.log(res), setTasks([...tasks, newTask]))
      .catch((err) => console.error(err));

    console.log(newTask);

    setName("");
    setDescription("");
    setColumn(curColumn);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new task</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex">
          <Input
            variant="filled"
            placeholder="task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            variant="filled"
            placeholder="task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            variant="filled"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
          >
            <option>{curColumn.description}</option>
            {columns
              .filter((col) => col.description !== curColumn.description)
              .map((col) => (
                <option key={col.id} value={col.description}>
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
