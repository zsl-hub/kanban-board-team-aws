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
} from "@chakra-ui/react";
import columns from "../../config/columns";

interface ModalAddTaskProps {
  isOpen: boolean;
  onClose: () => void;
  curColumn: string;
}

export default function ModalAddTask({
  isOpen,
  onClose,
  curColumn,
}: ModalAddTaskProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new task</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex">
          <Input variant="filled" placeholder="task name" />

          <Textarea variant="filled" placeholder="task description" />

          <Select variant="filled">
            <option>{curColumn}</option>
            {columns
              .filter((col) => col.description !== curColumn)
              .map((col) => (
                <option key={col.id} value={col.description}>
                  {col.description}
                </option>
              ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
