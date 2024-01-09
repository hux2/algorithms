const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = []; // 한 줄씩 입력받은 데이터를 합치기 위한 변수

let count = 0; // 그림의 개수
let largestOne = 0; // 가장 넓은 그림의 크기

let board; // 입력받은 도화지
let visited; // 방문한 노드를 표시하기 위한 자료구조(board와 동일한 형태)
let n; // board's height
let m; // board's width

let Q = []; // 탐색을 마친 노드를 임시로 저장하기 위한 큐(처럼 쓸 배열)

let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1]; // 좌표 이동을 효율적으로 계산하기 위해 방향을 미리 적어둔 것

function parse() {
  n = input[0][0]; // 세로 길이
  m = input[0][1]; // 가로 길이

  board = input.slice(1); // 첫 번째 줄을 잘라낸 나머지 값을 저장
  visited = new Array(n).fill(0).map(() => new Array(m).fill(0)); // board와 똑같은 형태의 자료구조 만들고 값은 전부 0으로 채우기
}

function solve() {
  // 도화지의 모든 칸을 순회하며 bfs를 진행해야 하는지 찾고 해당되면 bfs를 통해 그림의 크기를 알아냄
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && board[i][j]) {
        bfs(i, j);
        count++; // bfs를 진행한 수가 곧 그림의 개수가 됨
      }
    }
  }
}

function bfs(y, x) {
  let size = 0; // bfs를 통해 현재 찾고있는 그림의 크기를 위한 변수
  size++;
  visited[y][x] = 1;
  Q.unshift({ x: x, y: y }); // 배열을 큐처럼 사용하기 위해 배열 첫 부분에 요소를 추가하는 unshift 메소드를 사용함 (pop 메소드가 배열 맨 뒷 부분을 가져오므로)
  while (Q.length != 0) {
    let current = Q.pop();
    for (let dir = 0; dir < 4; dir++) {
      let nx = current.x + dx[dir];
      let ny = current.y + dy[dir];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue; // 해당 좌표(ny, nx)가 board의 범위를 넘어가는 경우 skip
      if (visited[ny][nx] || !board[ny][nx]) continue; // 해당 좌표가 이미 탐색한 곳이거나 탐색할 수 없는 곳인 경우 skip
      size++;
      visited[ny][nx] = 1;
      Q.unshift({ x: nx, y: ny });
    }
  }
  if (size > largestOne) largestOne = size; // 현재 찾은 그림과 지금껏 찾은 가장 큰 그림의 크기를 비교해서 갱신
}

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  parse();
  solve();
  console.log(count);
  console.log(largestOne);
  process.exit();
});

// line으로 받은 한 줄, 한 줄을 input에 전부 push하여 입력값을 모두 저장
// parse 함수로 input을 처리하기 쉬운 형태로 파싱
// 파싱한 데이터를 solve 함수가 참조하여 정답을 도출
