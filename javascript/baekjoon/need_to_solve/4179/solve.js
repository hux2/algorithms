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

// # = 벽
// . = 빈공간
// J = 지훈
// F = 불

let input = [];
let answer;

let r;
let c;
let maze = [];

let checked;
const Q = new Queue();

let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];

function parse() {
  let firstLine = input[0].split(" ").map(Number);

  r = firstLine[0];
  c = firstLine[1];

  let inputArray = input.slice(1);

  for (let i = 0; i < inputArray.length; i++) {
    maze.push(Array.from(inputArray[i]));
  }

  checked = new Array(r).fill(0).map(() => new Array(c).fill(0));
}

function solve() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (maze[i][j] === "#") checked[i][j] = "#";
      if (maze[i][j] === "J") {
        checked[i][j] = "J";
        Q.push({ x: j, y: i });
      }
      if (maze[i][j] === "F") {
        checked[i][j] = "F";
        Q.push({ x: j, y: i });
      }
    }
  }
  bfs();
  //
}

function bfs() {
  //
  while (Q.size()) {
    let cur = Q.pop();
    for (let dir = 0; dir < 4; dir++) {
      let nx = cur.x + dx[dir];
      let ny = cur.y + dy[dir];
      if (nx < 0 || nx >= c || ny < 0 || ny >= r) continue;
      if (checked[ny][nx] == "#" || checked[ny][nx] == "F") continue;
      Q.push({ x: nx, y: ny });

      //
    }
  }
}

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  parse();
  solve();
  console.log(answer);
  process.exit();
});
