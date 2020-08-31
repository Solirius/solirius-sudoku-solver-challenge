const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', line => {
  console.log(line);
});

console.log("Running1");
console.log("Running2");
console.log("Done3");
console.log("Done4");
