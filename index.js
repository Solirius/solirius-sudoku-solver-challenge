const { spawn } = require("child_process");
const neatCsv = require("neat-csv");
const fs = require("fs");
const intoStream = require("into-stream");
const readline = require("readline");
const colors = require("colors");

if (!process.argv[2]) {
  usage();
  process.exit();
}

async function main() {
  const rows = await neatCsv(fs.createReadStream("examples.csv"));
  console.time("run");
  console.log("Running: " + process.argv.slice(2));

  const [cli, ...args] = process.argv.slice(2);
  const cmd = spawn(cli, args);
  let i = 0;
  let errors = 0;

  const child = readline.createInterface({ input: cmd.stdout });

  child.on('line', data => {
    if (rows[i]) {
      if (data.toString() !== rows[i].solutions) {
        errors++;
        console.log(data.toString().red, rows[i].solutions);
      }
      else {
        console.log(data.toString().green, rows[i].solutions);
      }
      i++;
    }
  });

  cmd.stderr.on('data', data => {
    console.error(data.toString());
  });

  cmd.on("exit", code => {
    console.timeEnd("run");
    console.log(errors + " errors");
  });

  cmd.on("error", err => {
    console.error(err);
  });

  intoStream(rows.map(row => row.quizzes + "\n")).pipe(cmd.stdin);
}

function usage() {
  console.log("Solirius Sudoku Solver Challenge. Usage:");
  console.log("");
  console.log("npx sssc [your command]");
  console.log("");
  console.log("e.g. npx sssc java -jar myapp.jar");
}

main().catch(err => console.error(err));
