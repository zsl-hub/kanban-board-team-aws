import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "kanban-board-team-aws",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack);
    app.stack(AppStack);
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
  }
} satisfies SSTConfig;
