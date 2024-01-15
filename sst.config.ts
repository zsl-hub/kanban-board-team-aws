import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";
import { StorageStack } from "./stacks/StorageStack";
import 'dotenv/config'

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
    app.setDefaultRemovalPolicy(process.env.DEFAULT_REMOVAL_POLICY || app.mode === "dev" ? "destroy" : "retain");
  }
} satisfies SSTConfig;
