export interface SpaunaConfig {
  extends?: string;
  framework?: WebFramework;
  buildTool?: BuildTool;
  serveTool?: ServeTool;
}

// TODO: implement more tools
export type BuildTool = "webpack";

// TODO: implement more tools
export type ServeTool = "webpack";

// TODO: implement more web frameworks
export type WebFramework = "react";

export const defaultSpaunaConfig: SpaunaConfig = {
  framework: "react",
  buildTool: "webpack",
  serveTool: "webpack",
};
