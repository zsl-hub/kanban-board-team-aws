import { Api, StackContext, Table } from "sst/constructs"

export function StorageStack({stack}: StackContext){
  const table = new Table(stack, "Tasks", {
    fields: {
      id: "string",
      name: "string",
      description: "string",
      columnId: "number",
    },
    primaryIndex: { partitionKey: "id" },
  });

  return table;
}