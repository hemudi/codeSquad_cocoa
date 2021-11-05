// 백준 11654번
// 아스키코드
// https://www.acmicpc.net/problem/11654

// 아스키 코드
// 입력된 문자의 아스키 코드를 반환

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString();

console.log(input.charCodeAt(0));