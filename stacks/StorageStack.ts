import { Api, StackContext, Table } from "sst/constructs"

export function StorageStack({stack}: StackContext){
  const table = new Table(stack, "Tasks", {
    fields: {
      id: "number",
      name: "string",
      description: "string",
      columnId: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  // Create the HTTP API for DynamoDB
  const api = new Api(stack, "API", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table],
      },
    },
    routes: {
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return table;
}