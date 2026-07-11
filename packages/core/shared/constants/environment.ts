import Constants, { ExecutionEnvironment } from "expo-constants";

export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
export const isProductionBuild = Constants.executionEnvironment === ExecutionEnvironment.Standalone;
export const isBareWorkflow = Constants.executionEnvironment === ExecutionEnvironment.Bare;
