import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
} from "@chakra-ui/react";

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
  return (
    <Flex flexDirection="column" gap="0.75rem">
      {tasks.map((task) => (
        <Card className="task" key={task.id} overflow="auto">
          <CardHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontWeight="500"
            borderBottom="1px solid black"
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
