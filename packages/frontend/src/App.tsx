import "./App.css";
import Icon from "./components/Icon";
import columns from "../columns";
import {
  Grid,
  GridItem,
  Card,
  CardHeader,
  Text,
  Button,
} from "@chakra-ui/react";

function App() {
  return (
    <Grid templateColumns={`repeat(${columns.length}, 320px)`} className="grid">
      {columns.map((col) => (
        <GridItem className="column">
          <Card w="full">
            <CardHeader className="column-header">
              <Icon color={col.statusColor} />
              <Text as="b">{col.name}</Text>
            </CardHeader>
          </Card>

          <Button colorScheme="teal" w="5">
            +
          </Button>
        </GridItem>
      ))}
    </Grid>
  );
}

export default App;
