// See https://stackoverflow.com/a/74112582
/// <reference lib="dom" />
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

  console.log(config);
  // Step 2: Find Command
  // Step 3: Execute Command
}

interface SpaunaConfig {
  extends?: string;
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
