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

  const fetchedTasksMockup = [
    {
      id: 1,
      name: "Odchudzanie ryb",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam facere voluptates placeat quisquam maximeratio",
      columnId: 1,
    },
    {
      id: 2,
      name: "Pisanie raportu",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus natus laboriosam ipsa modi corporis.",
      columnId: 3,
    },
    {
      id: 3,
      name: "Zakupy spożywcze",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem veniam qui earum adipisci debitis!",
      columnId: 2,
    },
    {
      id: 4,
      name: "Sprzątanie mieszkania",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas sequi sint eligendi suscipit?",
      columnId: 5,
    },
    {
      id: 5,
      name: "Nauka języka hiszpańskiego",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, cumque quae provident fugiat numquam.",
      columnId: 1,
    },
    {
      id: 6,
      name: "Projektowanie logo",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore culpa rem vel voluptate?",
      columnId: 4,
    },
    {
      id: 7,
      name: "Pranie ubrań",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore distinctio enim nisi quos reprehenderit?",
      columnId: 3,
    },
    {
      id: 8,
      name: "Ćwiczenia na siłowni",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, iste repellendus accusantium exercitationem impedit.",
      columnId: 2,
    },
    {
      id: 9,
      name: "Gotowanie obiadu",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure optio eos dolore consequuntur recusandae?",
      columnId: 5,
    },
    {
      id: 10,
      name: "Oglądanie filmów",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minima ut blanditiis aperiam libero?",
      columnId: 1,
    },
  ];

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
        {columns.map((col) => {
          const tasksForColumn = fetchedTasksMockup.filter(
            (task) => task.columnId === col.id
          );
          return (
            <Column
              key={col.id}
              column={col}
              tasks={tasksForColumn}
              bgColor={value}
            />
          );
        })}
      </Grid>
    </>
  );
}

export default App;
