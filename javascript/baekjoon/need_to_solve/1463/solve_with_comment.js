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

let number;
let count = 0;

const Q = new Queue();
let checked;

let calc = [];

function solve() {
  checked = new Array(number).fill(0); // 배열의 인덱스가 현재 계산을 통해 얻은 값을 가리킨다.
  // 각 인덱스에 할당된 값은 연산 횟수

  if (number == 1) {
    console.log(0);
    return;
    // 입력받은 숫자가 1이면 연산이 필요 없으므로 0을 출력
  }

  Q.push(1); //
  count++;
  bfs();
}

function bfs() {
  while (Q.size()) {
    let cur = Q.pop();

    let one = cur + 1;
    let two = cur * 2;
    let three = cur * 3;

    count = checked[cur] + 1;

    if (one == number || two == number || three == number) {
      console.log(count);
      return;
    }

    if (one < number && checked[one] == 0) {
      Q.push(one);
      checked[one] = count;
    }

    if (two < number && checked[two] == 0) {
      Q.push(two);
      checked[two] = count;
    }

    if (three < number && checked[three] == 0) {
      Q.push(three);
      checked[three] = count;
    }
  }
}

rl.on("line", (line) => {
  number = Number(line);
  rl.close();
}).on("close", () => {
  solve();
  process.exit();
});
