import { intConfig } from "./int";
import { devConfig } from "./dev";

export function getStageConfig(stage : string) {
    switch(stage) {
        case "int":
            return intConfig
        default:
            return devConfig
    }
}