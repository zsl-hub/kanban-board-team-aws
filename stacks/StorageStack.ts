import { Api, StackContext, Table, Bucket, WebSocketApi } from "sst/constructs"

export function StorageStack({stack}: StackContext){
  const bucket = new Bucket(stack, 'Uploads')
  const table = new Table(stack, "Tasks", {
    fields: {
      id: "string",
      name: "string",
      description: "string",
      columnId: "number",
      order: "number",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const connection = new Table(stack, "Connections", {
    fields:{
      id:"string",
      username:"string"
    },
    primaryIndex: { partitionKey: "id" },
  })

  // Create the WebSocket API
const api = new WebSocketApi(stack, "Api", {
  defaults: {
    function: {
      bind: [table, connection],
    },
  },
  routes: {
    $connect: "packages/functions/src/connection/connect.main",
    $disconnect: "packages/functions/src/connection/disconnect.main",
    sendrequest: "packages/functions/src/connection/sendRequest.main",

  },
});

// Show the API endpoint in the output
stack.addOutputs({
  ApiEndpoint: api.url,
});

  return {
    table: table,
    connection: connection,
    bucket: bucket
  };
}