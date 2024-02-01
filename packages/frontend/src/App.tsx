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
import LoginPanel from "./components/LoginPanel";
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
      const tasks = await fetchAllTasks();
      if (ctrlPressed && zPressed) {
        undo()
          .then((e) => {
            if (e === undefined) return;
            setTasks(e)
          })
          .catch((err) => console.error(err))
      }

      if (ctrlPressed && yPressed) {
        redo()
          .then((e) => {
            if (e === undefined) return;
            console.log(tasks);
            console.log(e);
            setTasks(e)
          })
          .catch((err) => console.error(err))
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Flex justify="space-between" align="center">
        <Header />

        <Box display="flex" alignItems="center" gap="1rem">
          <LoginPanel />

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌘" : "🌞"}
          </Button>
        </Box>
      </Flex>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}
      >
        <SimpleGrid
          columns={{ lg: 5, md: 3, sm: 1 }}
          spacing="1rem"
          className="grid"
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
              />
            );
          })}
        </SimpleGrid>
      </DragDropContext>
    </>
  );
}

export default App;
