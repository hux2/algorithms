const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count;
let one = [];
let two = [];
let three = [];
let temp;

function parse(line) {
  count = Number(line);

  for (let i = count; i > 0; i--) {
    one.push(i);
  }
}

rl.on("line", (line) => {
  parse(line);
}).on("close", () => {
  console.log(one);
  process.exit();
});
