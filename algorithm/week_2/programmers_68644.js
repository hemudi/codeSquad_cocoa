// 프로그래머스
// 두개 뽑아서 더하기
// https://programmers.co.kr/learn/courses/30/lessons/68644
// 다른 사람 풀이에서 Set 사용한거 다시 살펴보기

function solution(numbers) {
    var answer = [];
    let sum;
    
    for(let left = 0; left < numbers.length-1; left++){
        for(let right = left + 1; right < numbers.length; right++){
            sum = numbers[left] + numbers[right];
            if(!answer.includes(sum)) answer.push(sum);
        }
    }
    
    return answer.sort(function(a, b) { return a - b;});
}

const testArray = {
    1 : [2,1,3,4,1],
    2 : [5,0,2,7]
}

console.log(solution(testArray[1]));
console.log(solution(testArray[2]));