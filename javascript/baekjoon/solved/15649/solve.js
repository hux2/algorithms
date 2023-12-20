const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let length;
let answer = [];
let checked;
let output = "";

function solve(index, count) {
  if (index == length) {
    output += answer.join(" ") + "\n";
    return;
  }
  for (let i = 1; i <= count; i++) {
    if (!checked[i]) {
      answer.push(i);
      checked[i] = true;
      solve(index + 1, count);
      answer.pop();
      checked[i] = false;
    }
  }
}

rl.on("line", (line) => {
  let input = line.split(" ").map(Number);
  let count = input[0];
  length = input[1];
  checked = new Array(count).fill(false);
  checked[0] = true;
  solve(0, count);
  rl.close();
}).on("close", () => {
  console.log(output);
  process.exit();
});
