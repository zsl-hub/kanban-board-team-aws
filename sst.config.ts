import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";
import { StorageStack } from "./stacks/StorageStack";
import { getStageConfig } from "./conf/getStageConfig";

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
    app.setDefaultRemovalPolicy(getStageConfig(app.stage).DEFAULT_REMOVAL_POLICY);
  }
} satisfies SSTConfig;
