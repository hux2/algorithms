const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let answer = 0;
let result = 0;

function solve(number) {
  if (result == number) {
    return;
  }
}

rl.on("line", (line) => {
  solve(Number(line));
  rl.close();
}).on("close", () => {
  console.log(answer);
  process.exit();
});
