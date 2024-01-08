import { SSTConfig } from "sst";
import { AppStack } from "./stacks/AppStack";

export default {
  config(_input) {
    return {
      name: "kanban-board-team-aws",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(AppStack);
  }
} satisfies SSTConfig;
