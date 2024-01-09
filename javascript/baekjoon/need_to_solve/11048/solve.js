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
    let temp = this.storage[this.front];
    delete this.storage[this.front];
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front += 1;
    }
    return temp;
  }
}

let input = [];
let answer = 0;

let n;
let m;
let maze;
let visited;
const Q = new Queue();

let dr = [0, 1, 1];
let dc = [1, 0, 1];

function parse() {
  n = input[0][0];
  m = input[0][1];

  maze = input.slice(1);

  visited = new Array(n).fill(-1).map(() => new Array(m).fill(-1));
}

function solve() {
  Q.push({ r: 0, c: 0 });
  answer += maze[0][0];
  visited[0][0] = answer;
  bfs();
}

function bfs() {
  while (Q.size()) {
    let cur = Q.pop();
    for (let dir = 0; dir < 3; dir++) {
      let nr = cur.r + dr[dir];
      let nc = cur.c + dc[dir];
      if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
      if (visited[nr][nc] >= 0) continue;
      visited[nr][nc] = visited[cur.r][cur.c] + maze[nr][nc];
      Q.push({ r: nr, c: nc });
    }
  }
}

// bfs로 풀어야 하는 문제인줄 알았는데 아니었다.
// 다이나믹 프로그래밍을 공부할 때 다시 돌아와 풀도록 하겠다.

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  parse();
  solve();
  console.log(visited);
  process.exit();
});
