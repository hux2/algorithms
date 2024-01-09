const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.storage[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }

  push(data) {
    if (this.size() === 0) {
      this.storage["0"] = data;
    } else {
      this.rear += 1;
      this.storage[this.rear] = data;
    }
  }

  pop() {
    let temp;
    if (this.front === this.rear) {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front += 1;
    }
    return temp;
  }
}

let answer = 0;

let input = [];

let m; // x축
let n; // y축
let h; // z축

let boxes = []; // 3차원 배열

let checked; // boxes와 동일한 형태의 3차원 배열, 모든 값은 0으로 초기화될 예정
const Q = new Queue(); // 직접 구현한 Queue
let dx = [1, 0, -1, 0, 0, 0];
let dy = [0, 1, 0, -1, 0, 0];
let dz = [0, 0, 0, 0, 1, -1]; // 총 6방향을 미리 계산해둔 x, y, z축 배열

function parse() {
  m = input[0][0];
  n = input[0][1];
  h = input[0][2];

  let inputArray = input.slice(1); // 첫 줄 잘라내고 저장

  for (let i = 0; i < h; i++) {
    let tempArray = [];
    for (let j = 0; j < n; j++) {
      tempArray.push(inputArray.pop()); // 2차원 배열의 인자를 하나씩 빼서 임시배열에 담기
    }
    boxes.push(tempArray); // 완성된 임시배열(2차원 배열)을 boxes(3차원 배열)에 담기 -> 최종적으로 3차원 배열 완성
  }

  checked = new Array(h)
    .fill(0)
    .map(() => new Array(n).fill(0).map(() => new Array(m).fill(0)));
  // 모든 값이 0으로 초기화된 3차원 배열 만들기
}

function solve() {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < m; k++) {
        if (boxes[i][j][k] == 1) Q.push({ x: k, y: j, z: i }); // 큐에 bfs를 처음 시작할 좌표를 모두 집어넣기
        if (boxes[i][j][k] == 0) checked[i][j][k] = -1;
        // 익지 않은 토마토를 -1로 두고 bfs를 모두 실행한 후에도 -1이 남아있다면 answer를 -1로 초기화
      }
    }
  }
  bfs();
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < m; k++) {
        if (checked[i][j][k] == -1) {
          // 너비 우선 탐색을 모두 실행했는데도 익지 않은 토마토(-1)가 남아있는 경우 -1 출력하고 종료
          console.log(-1);
          process.exit();
        }
        answer = Math.max(answer, checked[i][j][k]); // 값이 모두 초기화된 checked(3차원 배열) 순회, 가장 큰 값을 찾기
        // 가장 큰 값이, 가장 익는데 오래 걸린 토마토의 날짜가 되므로
      }
    }
  }
}

function bfs() {
  while (Q.size()) {
    let cur = Q.pop();
    for (let dir = 0; dir < 6; dir++) {
      // 동서남북 + 위아래 총 6방향을 확인해야 하므로 6까지
      let nx = cur.x + dx[dir];
      let ny = cur.y + dy[dir];
      let nz = cur.z + dz[dir];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n || nz < 0 || nz >= h) continue;
      if (checked[nz][ny][nx] >= 0) continue; // -1만 익지 않은 토마토이므로 0보다 크거나 같으면 skip
      Q.push({ x: nx, y: ny, z: nz });
      checked[nz][ny][nx] = checked[cur.z][cur.y][cur.x] + 1;
    }
  }
}

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  parse();
  solve();
  console.log(answer);
  process.exit();
});
