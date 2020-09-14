#!/usr/bin/env node

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
  const rows = await neatCsv(fs.createReadStream(__dirname + "/examples.csv"));
  console.time("run");
  console.log("Running: " + process.argv.slice(2));

  const [cli, ...args] = process.argv.slice(2);
  const cmd = spawn(cli, args);
  let errors = 0;
  let completed = 0;

  const child = readline.createInterface({ input: cmd.stdout });

  child.on('line', data => {
    completed++;
    const [id, answer] = data.toString().split(",");

    if (rows[id]) {
      if (answer !== rows[id].solutions) {
        errors++;
        console.log(answer.red, rows[id].solutions);
      }
    }
  });

  cmd.stderr.on('data', data => {
    console.error(data.toString());
  });

  cmd.on("exit", code => {
    console.timeEnd("run");
    console.log(errors + " errors");
    console.log(rows.length - completed + " missing");
  });

  cmd.on("error", err => {
    console.error(err);
  });

  intoStream(rows.map((row, i) => `${i},${row.quizzes}\n`)).pipe(cmd.stdin);
}

function usage() {
  console.log("Solirius Sudoku Solver Challenge.");
  console.log("");
  console.log("Usage: npx sssc [your command]");
  console.log("");
  console.log("e.g. npx sssc java -jar myapp.jar");
}

main().catch(err => console.error(err));
