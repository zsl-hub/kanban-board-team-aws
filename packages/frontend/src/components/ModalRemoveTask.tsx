import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { deleteTask } from "../api/endpoints";
import { TaskInterface } from "../types";

interface ModalRemoveTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInterface;
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}

export default function ModalRemoveTask({
  isOpen,
  onClose,
  task,
  tasks,
  setTasks,
}: ModalRemoveTaskProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  function handleRemoveTask() {
    const promise = deleteTask(task.id)
      .then(() => {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        setTasks(updatedTasks);
      })
      .catch((err) => console.error(err));

    toast.promise(promise, {
      success: {
        title: "Task Removed Successfully",
        description: "The task has been removed from your list.",
      },
      error: {
        title: "Unable to Remove Task",
        description: "Oops! Something went wrong while removing your task.",
      },
      loading: {
        title: "Removing Task",
        description: "Hold on, we're removing your task.",
      },
    });

    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Task
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleRemoveTask} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
