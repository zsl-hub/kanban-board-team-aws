import "./App.css";
import {
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
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

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue(colors.lightGray, colors.darkGray);

  const [columns] = useState(columnsFromConfig);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchAllTasks();
      setTasks(fetchedTasks);
    };
    getTasks();
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
          <LoginPanel />

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
