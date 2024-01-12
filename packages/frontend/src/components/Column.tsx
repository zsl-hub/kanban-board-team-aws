import {
  Button,
  Card,
  CardHeader,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Icon from "./Icon";
import ModalAddTask from "./ModalAddTask";

type ColumnProps = {
  column: {
    id: number;
    description: string;
    statusColor: string;
  };
};

export default function Column({ column }: ColumnProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem className="column">
      <Card w="full">
        <CardHeader className="column-header">
          <Icon color={column.statusColor} />
          <Text as="b">{column.description}</Text>
        </CardHeader>
      </Card>

      <Button onClick={onOpen} colorScheme="teal" w="5">
        +
      </Button>

      <ModalAddTask
        isOpen={isOpen}
        onClose={onClose}
        curColumn={column.description}
      />
    </GridItem>
  );
}
