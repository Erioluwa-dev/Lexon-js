import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

async function runTests() {
  console.log("Running tests...\n");
  const { stdout, stderr } = await execAsync("npx vitest run");
  console.log(stdout);
  if (stderr) console.error(stderr);
}

runTests().catch(console.error);