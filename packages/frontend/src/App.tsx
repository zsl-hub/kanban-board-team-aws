import "./App.css";
import {
  Flex,
  Heading,
  Text,
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
      <Flex justify="space-between" align="center">
        <Heading display="flex" flexDirection="row" size={["md", "lg", "xl"]}>
          <Text>
            <span className="colored-header">AWS</span>
            ome Kanban
          </Text>
        </Heading>

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
