const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

let n;
let m;

let maze;
let distanceMap;
let Q = [];
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];

function parse() {
  let first = input[0].split(" ").map(Number);

  n = first[0];
  m = first[1];

  maze = input.slice(1).map((el) => Array.from(el, (x) => Number(x)));

  distanceMap = new Array(n).fill(0).map(() => new Array(m).fill(0));
}

function solve() {
  distanceMap[0][0] = 1;
  Q.unshift({ x: 0, y: 0 });
  while (Q.length != 0) {
    let cur = Q.pop();
    for (let dir = 0; dir < 4; dir++) {
      let nx = cur.x + dx[dir];
      let ny = cur.y + dy[dir];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (distanceMap[nx][ny] > 0 || !maze[nx][ny]) continue;
      distanceMap[nx][ny] = distanceMap[cur.x][cur.y] + 1;
      Q.unshift({ x: nx, y: ny });
    }
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  parse();
  solve();
  //console.log(distanceMap);
  console.log(distanceMap[n - 1][m - 1]);
  process.exit();
});
