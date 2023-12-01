const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let limit;
let minimunCost = Number.MAX_SAFE_INTEGER;

function solve(depth, index, currentCost, costArray, checked) {
  if (depth == limit) {
    if (costArray[index][0] != 0) {
      minimunCost = Math.min(minimunCost, currentCost + costArray[index][0]);
    }
    // 결과 처리 후 탐색 종료
    return;
  }
  for (let i = 0; i < limit; i++) {
    // 더 깊은 곳으로 탐색 반복
    if (!checked[i] && costArray[index][i] != 0) {
      checked[i] = true;
      solve(
        depth + 1,
        i,
        currentCost + costArray[index][i],
        costArray,
        checked
      );
      checked[i] = false;
    }
  }
}

function parse(input) {
  limit = Number(input[0]);
  let costArray = input.slice(1).map((line) => line.split(" ").map(Number));
  let checked = new Array(limit).fill(false);
  checked[0] = true;
  solve(1, 0, 0, costArray, checked);

  return minimunCost;
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  let output = parse(input);
  console.log(output);
  process.exit();
});
