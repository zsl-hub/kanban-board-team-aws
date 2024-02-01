import { DynamoDB, ApiGatewayManagementApi } from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandler } from "aws-lambda";

const TaskTable = Table.Tasks.tableName;
const dynamoDb = new DynamoDB.DocumentClient();


export const main: APIGatewayProxyHandler = async (event) => {
  const { stage, domainName, connectionId } = event.requestContext;

  const callbackUrl = `https://${domainName}/${stage}`;
  const client = new ApiGatewayManagementApi({ endpoint: callbackUrl });


  const Tasks = await dynamoDb.scan({TableName: TaskTable}).promise();
  try {
    await client.postToConnection({ConnectionId: connectionId, Data: JSON.stringify(Tasks.Items)}).promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200
  };
};