import {Api, ApiAuthorizer, StackContext, StaticSite} from "sst/constructs";
import {App, Stack} from "aws-cdk-lib";

function createApi(stack: Stack) {
  return new Api(stack, "Api", {
    routes: {
      "GET /hello-world": "packages/functions/src/hello-world/lambda.main",
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
