import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";
import { StorageStack } from "./stacks/StorageStack";
import { getStageConfig } from "./conf/getStageConfig";
import { StageConfig } from "./conf/stageConfig";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "kanban-board-team-aws",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    const stageConfig : StageConfig = getStageConfig(app.stage);
    app.stack(StorageStack);
    app.stack(AppStack);
    app.stack(AuthStack);
    app.setDefaultRemovalPolicy(stageConfig.DEFAULT_REMOVAL_POLICY);
  }
} satisfies SSTConfig;
