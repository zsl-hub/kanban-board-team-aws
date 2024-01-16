import {
  Card,
  CardHeader,
  Text,
  Button,
  CardBody,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import colors from "../../config/colors";
import ModalRemoveTask from "./ModalRemoveTask";

interface Task {
  id: number;
  name: string;
  description: string;
  columnId: number;
}

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const value = useColorModeValue(colors.lightGray, colors.veryDarkGray);

  const optimaldescriptionLength = 50;
  const descriptionLength = task.description.length;
  const shortenedDescription = task.description
    .split(" ")
    .slice(0, 6)
    .join(" ");

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Card className="task" key={task.id}>
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontWeight="500"
        borderBottom={`1px solid ${value}`}
      >
        <Text>{task.name}</Text>

        <Button variant="outline" size="xs" onClick={onOpen}>
          X
        </Button>

        <ModalRemoveTask isOpen={isOpen} onClose={onClose} />
      </CardHeader>

      <CardBody
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="0.5rem"
      >
        <Text>
          {descriptionLength > optimaldescriptionLength
            ? isExpanded
              ? task.description
              : shortenedDescription
            : task.description}
        </Text>

        {descriptionLength > optimaldescriptionLength ? (
          <Button
            size="s"
            fontSize="s"
            variant="outline"
            padding="0.2em 0.5em"
            onClick={handleExpand}
          >
            {isExpanded ? "show less" : "show more"}
          </Button>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
}
