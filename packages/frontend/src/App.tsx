import "./App.css";
import {
  Grid,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import columns from "../config/columns";
import colors from "../config/colors";
import Column from "./components/Column";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const value = useColorModeValue(colors.lightGray, colors.darkGray);

  return (
    <>
      <Flex>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "🌘" : "🌞"}
        </Button>
      </Flex>
      <Grid
        templateColumns={`repeat(${columns.length}, 345px)`}
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
