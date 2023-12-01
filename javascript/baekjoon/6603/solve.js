const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let numbers = [];
let checked;
let input;
let output = "";

function solve(index, prevNum, count) {
  if (index == 6) {
    output += numbers.join(" ") + "\n";
    return;
  }
  for (let i = 0; i < count; i++) {
    if (!checked[i] && prevNum < input[i]) {
      checked[i] = true;
      numbers.push(input[i]);
      solve(index + 1, input[i], count);
      numbers.pop();
      checked[i] = false;
    }
  }
}

rl.on("line", (line) => {
  if (Number(line) == false) {
    rl.close();
  }
  let inputLine = line.split(" ").map(Number);
  let count = inputLine[0];
  input = inputLine.slice(1);
  checked = new Array(count).fill(0);
  solve(0, 0, count);
  output += "\n";
}).on("close", () => {
  console.log(output);
  process.exit();
});
