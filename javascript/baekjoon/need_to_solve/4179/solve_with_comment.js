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
let answer = "IMPOSSIBLE"; // bfs를 돌려도 answer를 도출하지 못하면 탈출이 불가능한 것이므로 미리 IMPOSSIBLE로 초기화

let r; // 세로 (y)
let c; // 가로 (x)

let maze;

const Q = new Queue();
let checked;
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];

function parse() {
  r = Number(input[0][0]);
  c = Number(input[0][2]);

  maze = input.slice(1);

  checked = new Array(r).fill(0).map(() => new Array(c).fill(0));
}

function solve() {
  //
}

rl.on("line", (line) => {
  input.push(Array.from(line));
}).on("close", () => {
  parse();
  solve();
  console.log(answer);
  process.exit();
});
