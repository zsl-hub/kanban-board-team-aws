import "./App.css";
import Icon from "./components/Icon";
import columns from "../columns";
import {
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";

function App() {
  return (
    <Grid templateColumns={`repeat(${columns.length}, 330px)`} className="grid">
      {columns.map((col) => (
        <GridItem className="column">
          <Card>
            <CardHeader className="column-header">
              <Icon color={col.statusColor} />
              <Text as="b">{col.name}</Text>
            </CardHeader>
          </Card>

          <Button colorScheme="teal">+</Button>
        </GridItem>
      ))}
    </Grid>
  );
}

export default App;
