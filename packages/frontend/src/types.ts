export interface TaskInterface {
  id: string;
  name: string;
  description: string;
  columnId: number;
  order: number;
}

export interface ColumnInterface {
  id: number;
  description: string;
  statusColor: string;
  tasks?: TaskInterface[];
}
