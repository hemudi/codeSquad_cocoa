// 백준 1008번
// A/B
// https://www.acmicpc.net/problem/1008

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

const a = parseInt(input[0]);
const b = parseInt(input[1]);

console.log(a/b);