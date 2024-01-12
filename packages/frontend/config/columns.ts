import colors from "./colors";

interface Column {
  id: number;
  description: string;
  statusColor: string;
}

const columns: Column[] = [
  {
    id: 1,
    description: "BLOCKED",
    statusColor: colors.red,
  },
  {
    id: 2,
    description: "TODO",
    statusColor: colors.green,
  },
  {
    id: 3,
    description: "IN PROGRESS",
    statusColor: colors.brown,
  },
  {
    id: 4,
    description: "IN REVIEW",
    statusColor: colors.orange,
  },
  {
    id: 5,
    description: "DONE",
    statusColor: colors.purple,
  },
];

export default columns;
