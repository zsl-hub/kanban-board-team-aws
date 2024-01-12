import "./App.css";
import { Grid } from "@chakra-ui/react";
import columns from "../config/columns";
import Column from "./components/Column";

function App() {
  return (
    <Grid templateColumns={`repeat(${columns.length}, 345px)`} className="grid">
      {columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </Grid>
  );
}

export default App;
