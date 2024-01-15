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

type ColumnProps = {
  column: {
    id: number;
    description: string;
    statusColor: string;
  };
};

type Props = {
  bgColor: string;
  tasks: Array<object>;
} & ColumnProps;

export default function Column({ column, bgColor, tasks }: Props) {
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

        <Tasks tasks={tasks} />
      </Flex>

      <LightMode>
        <Button onClick={onOpen} colorScheme="teal" w="5">
          +
        </Button>
      </LightMode>

      <ModalAddTask
        isOpen={isOpen}
        onClose={onClose}
        curColumn={column.description}
      />
    </GridItem>
  );
}
