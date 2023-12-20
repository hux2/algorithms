const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let output = "";
let testCount;

function parse(line) {
  testCount = Number(line[0]);

  for (let i = 0; i < testCount; i++) {
    solve(line.slice(1 + 3 * i));
  }
}

function solve(line) {
  let coinCount = Number(line[0]);
  let coins = line[1].split(" ").map(Number);
  let amount = Number(line[2]);
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  parse(input);
  console.log(output);
  process.exit();
});
