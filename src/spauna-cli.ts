import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "serve",
    "start the server",
    (yargs) => {
      return yargs.option("port", {
        type: "number",
      });
    },
    (argv: Arguments) => {
      console.log("time to serve", argv);
    },
  )
  .parse();
