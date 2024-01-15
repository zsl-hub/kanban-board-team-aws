import "./App.css";
import {
  Grid,
  Flex,
  Heading,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import columns from "../config/columns";
import arraySize from "../config/optimalColumnArraySize";
import colors from "../config/colors";
import Column from "./components/Column";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue(colors.lightGray, colors.darkGray);

  return (
    <>
      <Flex justify="space-between" align="center">
        <Heading size={["md", "lg", "xl"]}>Kanban Board</Heading>

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌘" : "🌞"}
        </Button>
      </Flex>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          `repeat(${columns.length >= arraySize ? 5 : 3}, 1fr)`,
        ]}
        className="grid"
      >
        {columns.map((col) => (
          <Column key={col.id} column={col} bgColor={value} />
        ))}
      </Grid>
    </>
  );
}

export default App;
