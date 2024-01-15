import {
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

type ColumnProps = {
  column: {
    id: number;
    description: string;
    statusColor: string;
  };
};

type Props = {
  bgColor: string;
} & ColumnProps;

export default function Column({ column, bgColor }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem bg={bgColor} className="column">
      <Card w="full">
        <CardHeader className="column-header">
          <Icon color={column.statusColor} />
          <Text as="b" fontSize={["sm", "md", "lg", "xl"]}>
            {column.description}
          </Text>
        </CardHeader>
      </Card>

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
