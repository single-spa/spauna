import { SpaunaConfig } from "../spauna-config.js";
import reactWebpackConfig from "webpack-config-single-spa-react";
import webpackDevServer from "webpack-dev-server";
import webpack from "webpack";

export async function serveCommand(config: SpaunaConfig): Promise<void> {
  switch (config.serveTool) {
    case "webpack":
      await serveWebpack(config);
    default:
      throw Error(
        `spauna: serveTool '${config.serveTool}' is not yet implemented`,
      );
  }
}

async function serveWebpack(config: SpaunaConfig) {
  switch (config.framework) {
    case "react":
      // @ts-ignore
      const compiler = new webpack.Compiler("spauna", {
        experiments: {},
      });
      const webpackConfig = reactWebpackConfig({
        orgName: "joel",
        projectName: "test",
      });
      const devServer = new webpackDevServer(webpackConfig, compiler);
      devServer.start();
    default:
      throw Error(
        `spauna: webpack implementation to serve web framework '${config.framework}' is not implemented`,
      );
  }
}
