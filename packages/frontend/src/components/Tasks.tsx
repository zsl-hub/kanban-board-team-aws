import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import colors from "../../config/colors";

interface Task {
  id: number;
  name: string;
  description: string;
  columnId: number;
}

interface TaskProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TaskProps) {
  const value = useColorModeValue(colors.lightGray, colors.veryDarkGray);

  return (
    <Flex flexDirection="column" gap="0.75rem">
      {tasks.map((task) => (
        <Card className="task" key={task.id}>
          <CardHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontWeight="500"
            borderBottom={`1px solid ${value}`}
          >
            <Text>{task.name}</Text>
            <Button variant="outline" size="xs">
              X
            </Button>
          </CardHeader>
          <CardBody>
            <Text>{task.description}</Text>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
}
