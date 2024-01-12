import { Button, Card, CardHeader, GridItem, Text } from "@chakra-ui/react";
import Icon from "./Icon";

type ColumnProps = {
  column: {
    id: number;
    description: string;
    statusColor: string;
  };
};

export default function Column({ column }: ColumnProps) {
  return (
    <GridItem className="column">
      <Card w="full">
        <CardHeader className="column-header">
          <Icon color={column.statusColor} />
          <Text as="b">{column.description}</Text>
        </CardHeader>
      </Card>

      <Button colorScheme="teal" w="5">
        +
      </Button>
    </GridItem>
  );
}
