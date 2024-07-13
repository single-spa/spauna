// See https://stackoverflow.com/a/74112582
/// <reference lib="dom" />

export async function runCommand(
  commandName: string,
  configLocation: string,
  args: object,
) {
  // Step 1: Fetch Config
  // Step 2: Find Command
  // Step 3: Execute Command
}

async function fetchConfig(configLocation: string) {
  if (
    configLocation.startsWith("http://") ||
    configLocation.startsWith("https://")
  ) {
    const configResult: Response = await fetch(configLocation);
    if (configResult.ok) {
      const json = await configResult.json();
    }
  }
}
