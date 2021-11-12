// 프로그래머스
// 약수의 합
// https://programmers.co.kr/learn/courses/30/lessons/12928

function solution(n) {
    var answer = 0;

    for(let num = 1; num*num <= n; num++){
        if(n % num === 0){
            answer += (n / num === num) ? num : (n / num) + num;
        }
    }

    return answer;
}

const testCase = {
    1 : 12,
    2 : 5
}

console.log(solution(testCase[1]));
console.log(solution(testCase[2]));