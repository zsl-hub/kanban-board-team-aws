import {Api, use, StackContext, StaticSite} from "sst/constructs";
import { StorageStack } from "./StorageStack";
import {App, Stack} from "aws-cdk-lib";

function createApi(stack: Stack) {

  const table = use(StorageStack);

  return new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table],
      },
    },
    routes: {
      "POST /task/add": "packages/functions/src/lambda/task/add/lambda.main",
      "GET /task/get-all": "packages/functions/src/lambda/task/get-all/lambda.main",
      "DELETE /task/delete": "packages/functions/src/lambda/task/delete/lambda.main",
      "GET /task/getByColumnId": "packages/functions/src/lambda/task/getByColumnId/lambda.main",
      "PUT /task/update": "packages/functions/src/lambda/task/update/lambda.main"
    },
  });
}

function createFrontend(stack: Stack, api: Api) {
  return new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url
    },
  });
}

export function AppStack({ stack, app }: StackContext) {

  const api = createApi(stack);

  const site = createFrontend(stack, api, app);

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
