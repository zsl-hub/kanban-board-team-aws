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
  useToast,
} from "@chakra-ui/react";
import { TaskInterface } from "../types";
import { useState } from "react";
import { updateTask } from "../api/endpoints";

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

  const toast = useToast();

  function handleEditTask() {
    if (!updatedName) {
      setIsNameEmpty(true);
      return;
    }

    const updatedTask = {
      ...task,
      name: updatedName,
      description: updatedDescription,
      order: task.order,
    };

    const promise = updateTask(updatedTask)
      .then(() => {
        onUpdateTask(updatedTask);
      })
      .catch((err) => console.error(err));

    toast.promise(promise, {
      success: {
        title: "Task Edited Successfully",
        description: "Your changes have been saved successfully.",
      },
      error: {
        title: "Unable to Edit Task",
        description: "Oops! Something went wrong while editing your task.",
      },
      loading: {
        title: "Editing Task",
        description: "Please wait while we save your changes.",
      },
    });

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
