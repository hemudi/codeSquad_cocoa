// 백준 2920번
// 음계
// https://www.acmicpc.net/problem/2920

// 1 -> 8 순서대로 연주 : ascending
// 8 -> 1 순서대로 연주 : descending
// 둘다 아니면 mixed

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);

// input = ['1', '2', '3', '4', '5', '6', '7', '8'];
// input = ['8', '7', '6', '5', '4', '3', '2', '1'];
// input = ['8', '1', '7', '2', '6', '3', '5', '4'];
// input = input.map(Number);

// 시작이 1, 8이 아닌 경우는 무조건 mixed
if(input[0] != 1 && input[0] != 8){
    console.log('mixed');
    return;
}

let interval = 0;

for(let index = 0; index < input.length - 1; index++){
    interval = input[index + 1] - input[index];

    if(interval != 1 && interval != -1){
        console.log('mixed');
        return;
    }
}

if(interval === 1) return console.log('ascending');
else return console.log('descending');