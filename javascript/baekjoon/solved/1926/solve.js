const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

let count = 0;
let LargestOne = 0;
let board = [];
let checked;
let Q = [];
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];

function bfs(x, y, n, m) {
  let size = 0;
  checked[x][y] = 1;
  size++;
  Q.push({ x: x, y: y });
  while (Q.length != 0) {
    let cur = Q.pop();
    for (let dir = 0; dir < 4; dir++) {
      let nx = cur.x + dx[dir];
      let ny = cur.y + dy[dir];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (checked[nx][ny] || !board[nx][ny]) continue;
      checked[nx][ny] = 1;
      size++;
      Q.push({ x: nx, y: ny });
    }
  }
  if (size > LargestOne) LargestOne = size;
}

function solve() {
  let n = input[0][0];
  let m = input[0][1];
  checked = new Array(n).fill(0).map(() => new Array(m).fill(0));

  board = input.slice(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (checked[i][j] != board[i][j]) {
        bfs(i, j, n, m);
        count++;
      }
    }
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  solve();
  console.log(count);
  console.log(LargestOne);
  process.exit();
});
