// See https://stackoverflow.com/a/74112582
/// <reference lib="dom" />
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { serveCommand } from "./commands/serve.js";
import { SpaunaConfig, defaultSpaunaConfig } from "./spauna-config.js";

export async function runCommand(
  commandName: string,
  configLocation: string,
  args: object,
) {
  // Step 1: Fetch Config
  const config = await fetchConfig(
    configLocation,
    pathToFileURL(process.cwd() + "/"),
  );

  // Step 2: Apply defaults to config
  const finalConfig = { ...defaultSpaunaConfig, ...config };

  // Step 3: Run Command
  switch (commandName) {
    case "serve":
      await serveCommand(finalConfig);
    default:
      throw Error(`spauna: no such command '${commandName}'`);
  }
}

async function fetchConfig(
  configLocation: string,
  parentUrl: URL,
): Promise<SpaunaConfig> {
  let config: SpaunaConfig;
  let extendParent: URL = parentUrl;

  if (
    configLocation.startsWith("http://") ||
    configLocation.startsWith("https://")
  ) {
    const configResult: Response = await fetch(configLocation);
    if (configResult.ok) {
      config = await configResult.json();
    }
  } else if (
    configLocation.startsWith("./") ||
    configLocation.startsWith("../") ||
    configLocation.startsWith("file://")
  ) {
    const fileUrl = new URL(configLocation, parentUrl);

    extendParent = fileUrl;

    const fileContents: string = await readFile(fileUrl, "utf-8");

    config = JSON.parse(fileContents);
  } else {
    throw Error(
      `spauna config location must start with with one of the following prefixes: ["https://", "http://", "./", "../", "file://"], but found ${configLocation} referenced in ${parentUrl}`,
    );
  }

  let finalConfig: SpaunaConfig;

  if (config.extends) {
    const otherConfig = await fetchConfig(config.extends, extendParent);

    finalConfig = { ...otherConfig, ...config };
  } else {
    finalConfig = config;
  }

  delete finalConfig.extends;

  return finalConfig;
}
