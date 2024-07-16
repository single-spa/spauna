import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";
import { runCommand } from "./spauna.js";

yargs(hideBin(process.argv))
  .command(
    "serve",
    "start the server",
    (yargs) => {
      return yargs
        .option("port", {
          type: "number",
        })
        .option("config", {
          type: "string",
        })
        .demandOption("config");
    },
    async (argv: Arguments) => {
      await runCommand("serve", argv.config as string, argv);
    },
  )
  .parse();
