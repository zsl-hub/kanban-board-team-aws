import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  LightMode,
  Textarea,
} from "@chakra-ui/react";
import { TaskInterface } from "../types";
import { useState } from "react";

interface DrawerEditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInterface;
  name: string;
  description: string;
  onUpdateTask: (updatedTask: TaskInterface) => void;
}

export default function DrawerEditTask({
  isOpen,
  onClose,
  task,
  name,
  description,
  onUpdateTask,
}: DrawerEditTaskProps) {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  function handleEditTask() {
    if (!updatedName) {
      setIsNameEmpty(true);
      return;
    }

    const updatedTask = {
      ...task,
      name: updatedName,
      description: updatedDescription,
    };

    onUpdateTask(updatedTask);
    setIsNameEmpty(false);
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Task Edit Menu</DrawerHeader>

        <DrawerBody>
          <FormControl display="flex" flexDirection="column" gap="0.75rem">
            <Box>
              <FormControl isInvalid={isNameEmpty}>
                <FormLabel>Task name</FormLabel>
                <Input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </FormControl>
            </Box>

            <Box>
              <FormLabel>Task description</FormLabel>
              <Textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                h="75dvh"
              />
            </Box>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <LightMode>
            <Button colorScheme="teal" onClick={handleEditTask}>
              Save
            </Button>
          </LightMode>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
