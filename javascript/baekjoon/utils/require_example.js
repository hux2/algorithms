const { Queue } = require("./queue.js");

const Q = new Queue();

Q.push({ 1: "test", 2: "the", 3: "Queue" });

console.log(Q.pop());
