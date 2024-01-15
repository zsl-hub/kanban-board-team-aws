import { devConfig } from "./dev";
import { envConfig } from "./env";

export function getStageConfig(stage : string) {
    switch(stage) {
        case "dev":
            return devConfig
        case "ryba":
            return envConfig
        case "Piotr":
            return envConfig
        case "milosz":
            return envConfig
        default:
            return envConfig
    }
}