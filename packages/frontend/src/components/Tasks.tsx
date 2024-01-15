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
import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

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

          <CardBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="0.5rem"
          >
            <Text>{`${task.description
              .split(" ")
              .slice(0, 6)
              .join(" ")}`}</Text>
            <Button
              size="s"
              fontSize="s"
              padding="0.2em 0.5em"
              onClick={handleExpand}
            >
              {isExpanded ? "show less" : "show more"}
            </Button>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
}
