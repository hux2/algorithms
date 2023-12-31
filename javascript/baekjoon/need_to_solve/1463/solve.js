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

  push(value) {
    if (this.size() === 0) {
      this.storage["0"] = value;
    } else {
      this.rear += 1;
      this.storage[this.rear] = value;
    }
  }

  pop() {
    let temp = this.storage[this.front];
    delete this.storage[this.front];
    if (this.rear === this.front) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.front += 1;
    }
    return temp;
  }
}

let number;
let count = 0;

let checked;
const Q = new Queue();

function solve() {
  checked = new Array(number + 1).fill(0);
  if (number == 1) return;
  checked[1] = 1;
  Q.push(1);
  bfs();
}

function bfs() {
  while (Q.size()) {
    let cur = Q.pop();

    let one = cur + 1;
    let two = cur * 2;
    let three = cur * 3;

    if (one == number || two == number || three == number) {
      count = checked[cur];
      return;
    }
    if (one < number && checked[one] == 0) {
      Q.push(one);
      checked[one] = checked[cur] + 1;
    }
    if (two < number && checked[two] == 0) {
      Q.push(two);
      checked[two] = checked[cur] + 1;
    }
    if (three < number && checked[three] == 0) {
      Q.push(three);
      checked[three] = checked[cur] + 1;
    }
  }
}

rl.on("line", (line) => {
  number = Number(line);
  rl.close();
}).on("close", () => {
  solve();
  console.log(count);
  process.exit();
});
