import { v4 as uuidv4 } from "uuid";

class Task {
  public id: string;
  public name: string;
  public description: string;
  public columnId: number;
  public order: number

  constructor(
    columnId: number,
    name: string,
    description: string = "",
    order: number,
    id?: string
  ) {
    this.id = id ?? ""
    this.columnId = columnId;
    this.name = name;
    this.description = description;
    this.order = order;
  }
}

export { Task };
