const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

let n; // y 좌표
let m; // x 좌표

let maze;

let distanceMap;
let Q = [];
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];

function parse() {
  let firstArray = input[0].split(" ").map(Number); // 첫 줄에 들어온 데이터를 숫자 배열로 변경
  n = firstArray[0];
  m = firstArray[1];

  maze = input.slice(1).map((el) => Array.from(el, (x) => Number(x))); // 입력받은 데이터로 미로 파싱, 저장

  distanceMap = new Array(n).fill(0).map(() => new Array(m).fill(0)); // (1, 1)에서 각 좌표까지의 거리를 저장하기 위한 미로와 동일한 형태의 자료구조
}

function solve() {
  bfs(0, 0);
}

function bfs(x, y) {
  Q.unshift({ x: x, y: y });
  distanceMap[y][x] = 1;
  while (Q.length != 0) {
    let current = Q.pop();
    for (let dir = 0; dir < 4; dir++) {
      let nx = current.x + dx[dir];
      let ny = current.y + dy[dir];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue; // 좌표가 범위를 넘어가는 경우 skip
      if (distanceMap[ny][nx] || !maze[ny][nx]) continue; // 거리가 이미 계산된 좌표이거나 미로에서 갈 수 없는 곳인 경우 skip
      Q.unshift({ x: nx, y: ny });
      distanceMap[ny][nx] = distanceMap[current.y][current.x] + 1; // 그 직전 좌표보다 1칸 더 이동했으므로 직전 거리 + 1 의 값을 저장
    }
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  parse();
  solve();
  console.log(distanceMap[n - 1][m - 1]);
  process.exit();
});
