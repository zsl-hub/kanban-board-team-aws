import { StackContext, Table } from "sst/constructs"

export function StorageStack({stack}: StackContext){
    const table = new Table(stack, "Tasks", {
      fields: {
        id: "number",
        name: "string",
        desc: "string",
        columnKey: "string",
      },
      primaryIndex: { partitionKey: "id" },
    });
  
    return table;
}