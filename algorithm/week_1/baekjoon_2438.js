// 백준 2438번
// 별 찍기 - 1
// https://www.acmicpc.net/problem/1008

// 첫째 줄에 N(1 <= N <= 100) 이 주어짐
// 첫째 줄부터 N번째 줄까지 차례대로 별을 출력
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ');

let max = parseInt(input)
let result = '';

for(let index = 0; index < max; index++){
    result += '*';
    console.log(result);
}