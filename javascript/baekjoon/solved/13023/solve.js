const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let graph;
let input = [];
let answer = 0;
let checked = [];

let people;
let relation;

function solve(depth, person) {
  if (depth == 5) {
    answer = 1;
    return;
  }
  for (let i = 0; i < graph[person].length; i++) {
    if (!checked[graph[person][i]]) {
      checked[graph[person][i]] = true;
      solve(depth + 1, graph[person][i]);
      checked[graph[person][i]] = false;
    }
  }
}

function parse(inputLine) {
  people = inputLine[0][0];
  relation = inputLine[0][1];
  checked = new Array(people).fill(false);

  graph = Array.from({ length: people }, () => Array(0));

  for (let i = 0; i < relation; i++) {
    let arr = inputLine.slice(1)[i];
    graph[arr[0]].push(arr[1]);
    graph[arr[1]].push(arr[0]);
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  parse(input);
  for (let i = 0; i < people; i++) {
    checked[i] = true;
    solve(1, i);
    checked[i] = false;
  }
  console.log(answer);
  process.exit();
});
