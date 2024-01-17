export interface TaskInterface {
  id: string;
  name: string;
  description: string;
  columnId: number;
}

export interface ColumnInterface {
  id: number;
  description: string;
  statusColor: string;
}
