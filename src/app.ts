import fs from "fs";
import { Keyring } from "@polkadot/keyring";
import yargs from "yargs";
import { Signale } from "signale";

const encodings: Record<"polkadot" | "kusama" | "ed" | "ed25519", number> = {
  polkadot: 0,
  kusama: 2,
  ed: 42,
  ed25519: 42,
};

// Custom logger
const logOptions = {
  types: {
    input: {
      badge: "📘",
      color: "blue",
      label: "Input",
      logLevel: "info",
    },
    output: {
      badge: "📗",
      color: "green",
      label: "Output",
      logLevel: "info",
    },
    format: {
      badge: "🪙",
      color: "yellow",
      label: "Format",
      logLevel: "info",
    },
  },
};

const logger = new Signale(logOptions);

async function run() {
  const keyring = new Keyring();

  // Config arguments
  const argv = await yargs(process.argv.slice(2)).options({
    input: { type: "string", default: "input.txt" },
    output: { type: "string", default: "output.txt" },
    format: {
      choices: ["kusama", "polkadot", "ed", "ed25519"] as const,
      default: "ed25519" as const,
    },
  }).argv;

  const { input, output, format } = argv;

  // Print arguments
  logger.input(input);
  logger.output(output);
  logger.format(format);

  // Cleanup output file
  fs.writeFileSync(output, "");

  // Read input file
  const inputText = fs.readFileSync(input, "utf8");

  // Convert addresses and store into output file
  inputText.split("\n").forEach((address) => {
    fs.appendFileSync(
      output,
      `${keyring.encodeAddress(address, encodings[format])}\n`
    );
  });
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    logger.error(
      "There was an error while converting the addresses. Please double check that your input file has one Polkadot/Kusama address per line, without any extra symbol."
    );
    console.error(err);
    process.exit(1);
  });
