// 백준 8958번
// OX 퀴즈
// https://www.acmicpc.net/problem/8958

// OX 퀴즈
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// let input = ['5',
//     'OOXXOXXOOO',
//     'OOXXOOXXOO',
//     'OXOXOXOXOXOXOX',
//     'OOOOOOOOOO',
//     'OOOOXOOOOXOOOOX'
// ]

let count = +input[0]; // 숫자형변환
let testCases = input.slice(1);
let score = 0;
let temp = 0;

for(let index = 0; index < count; index++){
    for(let value of testCases[index]){
        if(value != 'X'){
            temp++;
            continue;
        }

        score += sumTemp(temp);
        temp = 0;
    }

    score += sumTemp(temp);
    console.log(score);
    temp = 0;
    score = 0;
}

function sumTemp(num){
    if(num === 0) return 0;
    if(num === 1) return 1;
    return num + sumTemp(num - 1);
}
