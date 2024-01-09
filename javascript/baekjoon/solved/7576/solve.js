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

let answer = 0;

let input = [];

let m; // x
let n; // y

let box;

let checked;
let Q = new Queue();
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];

function parse() {
  m = input[0][0];
  n = input[0][1];

  box = input.slice(1);

  checked = new Array(n).fill(0).map(() => new Array(m).fill(0));
}

function solve() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (box[i][j] == 0) checked[i][j] = -1;
      if (box[i][j] == 1) {
        Q.push({ x: j, y: i });
      }
    }
  }
  bfs();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (checked[i][j] == -1) {
        console.log(-1);
        process.exit();
      }
      answer = Math.max(answer, checked[i][j]);
    }
  }
}

function bfs() {
  while (Q.size()) {
    let cur = Q.pop();
    for (let dir = 0; dir < 4; dir++) {
      let nx = cur.x + dx[dir];
      let ny = cur.y + dy[dir];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
      if (checked[ny][nx] >= 0) continue;
      Q.push({ x: nx, y: ny });
      checked[ny][nx] = checked[cur.y][cur.x] + 1;
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
