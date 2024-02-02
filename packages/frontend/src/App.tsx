import "./App.css";
import {
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
  useToast,
  Box,
} from "@chakra-ui/react";
import columnsFromConfig from "../config/columns";
import colors from "../config/colors";
import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchAllTasks } from "./api/endpoints";
import { useEffect, useState } from "react";
import { TaskInterface } from "./types";
import onDragEnd from "./utils/onDragEnd";
import Header from "./components/Header";
import { redo, undo } from "./utils/callEndpoint";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue(colors.lightGray, colors.darkGray);

  const [columns] = useState(columnsFromConfig);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const toast = useToast();

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchAllTasks();
      setTasks(fetchedTasks);
    };
    getTasks();
  }, []);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const ctrlPressed = event.ctrlKey || event.metaKey; // metaKey is for Mac
      const zPressed = event.key.toLocaleLowerCase() === "z";
      const yPressed = event.key.toLocaleLowerCase() === "y";

      if (ctrlPressed && zPressed) {
        const undoPromise = undo()
          .then((e) => {
            if (e === undefined) return;
            setTasks(e);
          })
          .catch((err) => console.error(err));

        toast.promise(undoPromise, {
          success: {
            title: "Undo Successful",
            description: "Your previous action has been undone.",
          },
          error: {
            title: "Unable to Undo",
            description:
              "Oops! Something went wrong while trying to undo your action.",
          },
          loading: {
            title: "Undoing Action",
            description: "Please wait while we undo your action.",
          },
        });
      }

      if (ctrlPressed && yPressed) {
        const redoPromise = redo()
          .then((e) => {
            if (e === undefined) return;
            console.log(tasks);
            console.log(e);
            setTasks(e);
          })
          .catch((err) => console.error(err));

        toast.promise(redoPromise, {
          success: {
            title: "Redo Successful",
            description: "Your previous action has been redone.",
          },
          error: {
            title: "Unable to Redo",
            description:
              "Oops! Something went wrong while trying to redo your action.",
          },
          loading: {
            title: "Redoing Action",
            description: "Please wait while we redo your action.",
          },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        aria-label="Header section with user controls"
      >
        <Header />

        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          aria-label="User control panel"
        >
          <Button onClick={toggleColorMode} aria-label="Toggle color mode">
            {colorMode === "light" ? "🌘" : "🌞"}
          </Button>
        </Box>
      </Flex>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}
        aria-label="Task management area"
      >
        <SimpleGrid
          columns={{ lg: 5, md: 3, sm: 1 }}
          spacing="1rem"
          className="grid"
          aria-label="Task columns"
        >
          {columns.map((col) => {
            const tasksForColumn = tasks?.filter(
              (task) => task.columnId === col.id
            );
            return (
              <Column
                key={col.id}
                column={col}
                tasks={tasks}
                setTasks={setTasks}
                tasksForColumn={tasksForColumn}
                bgColor={value}
                aria-label={`Task column ${col.description}`}
              />
            );
          })}
        </SimpleGrid>
      </DragDropContext>
    </>
  );
}

export default App;
