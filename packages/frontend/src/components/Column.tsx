import {
  Flex,
  Button,
  Card,
  CardHeader,
  GridItem,
  Text,
  useDisclosure,
  LightMode,
} from "@chakra-ui/react";
import Icon from "./Icon";
import ModalAddTask from "./ModalAddTask";
import Tasks from "./Tasks";

interface Column {
  id: number;
  description: string;
  statusColor: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  columnId: number;
}

interface ColumnProps {
  column: Column;
}

interface Props extends ColumnProps {
  bgColor: string;
  tasks: Task[];
  tasksForColumn: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Column({
  column,
  bgColor,
  tasksForColumn,
  tasks,
  setTasks,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem bg={bgColor} className="column">
      <Flex flexDirection="column" gap="1rem">
        <Card w="full">
          <CardHeader className="column-header">
            <Icon color={column.statusColor} />
            <Text as="b">{column.description}</Text>
          </CardHeader>
        </Card>

        <Tasks tasksForColumn={tasksForColumn} />
      </Flex>

      <LightMode>
        <Button onClick={onOpen} colorScheme="teal" w="5">
          +
        </Button>
      </LightMode>

      <ModalAddTask
        isOpen={isOpen}
        onClose={onClose}
        curColumn={column}
        tasks={tasks}
        setTasks={setTasks}
      />
    </GridItem>
  );
}
