// 프로그래머스
// 나누어 떨어지는 숫자 배열
// https://programmers.co.kr/learn/courses/30/lessons/12910

function solution(arr, divisor) {
    var answer = [];
    
    arr.sort(function(a, b) {
        return a - b;
    });
    
    answer = arr.filter(number => !(number % divisor));

    if(!answer.length){
        answer.push(-1);
    }
    
    return answer;
}

const testArray = {
    1 : [5, 9, 7, 10],
    2 : [2, 36, 1, 3],
    3 : [3, 2, 6]
}

const testDivisor = {
    1 : 5,
    2 : 1,
    3 : 10
} 

console.log(solution(testArray[1], testDivisor[1]));
console.log(solution(testArray[2], testDivisor[2]));
console.log(solution(testArray[3], testDivisor[3]));