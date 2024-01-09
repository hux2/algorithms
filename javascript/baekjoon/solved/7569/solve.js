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
      this.rear++;
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
      return temp;
    } else {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front++;
      return temp;
    }
  }
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let answer = 0;

let input = [];

let m;
let n;
let h;

let boxes = [];

let checked;

const Q = new Queue();
let dx = [1, 0, -1, 0, 0, 0];
let dy = [0, 1, 0, -1, 0, 0];
let dz = [0, 0, 0, 0, 1, -1];

function parse() {
  m = input[0][0];
  n = input[0][1];
  h = input[0][2];

  let inputArray = input.slice(1);

  for (let i = 0; i < h; i++) {
    let temp = [];
    for (let j = 0; j < n; j++) {
      temp.push(inputArray.pop());
    }
    boxes.push(temp);
  }

  checked = new Array(h)
    .fill(0)
    .map(() => new Array(n).fill(0).map(() => new Array(m).fill(0)));
}

function solve() {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < m; k++) {
        if (boxes[i][j][k] == 0) checked[i][j][k] = -1;
        if (boxes[i][j][k] == 1) Q.push({ x: k, y: j, z: i });
      }
    }
  }
  bfs();
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < m; k++) {
        if (checked[i][j][k] == -1) {
          console.log(-1);
          process.exit();
        }
        answer = Math.max(answer, checked[i][j][k]);
      }
    }
  }
}

function bfs() {
  while (Q.size()) {
    let cur = Q.pop();
    for (let dir = 0; dir < 6; dir++) {
      let nx = cur.x + dx[dir];
      let ny = cur.y + dy[dir];
      let nz = cur.z + dz[dir];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n || nz < 0 || nz >= h) continue;
      if (checked[nz][ny][nx] >= 0) continue;
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
