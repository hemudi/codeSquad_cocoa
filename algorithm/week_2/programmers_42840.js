// 프로그래머스
// 모의고사
// https://programmers.co.kr/learn/courses/30/lessons/42840

function solution(answers) {
    var answer = [];
    const student = {
        1 : [1,2,3,4,5],
        2 : [2,1,2,3,2,4,2,5],
        3 : [3,3,1,1,2,2,4,4,5,5]
    }
    
    let count = {
        1 : 0,
        2 : 0,
        3 : 0
    }
    
    for(let index = 0 ; index < answers.length ; index++){
        for(let num = 1 ; num <= 3 ; num++){
            if(student[num][index >= student[num].length ? index % student[num].length : index] === answers[index])
            count[num]++;
        }
    }

    if(count[1] >= count[2] && count[1] >= count[3]){
        answer.push(1);
    }

    if(count[2] >= count[1] && count[2] >= count[3]){
        answer.push(2);
    }

    if(count[3] >= count[1] && count[3] >= count[2]){
        answer.push(3);
    }
    
    return answer;
}

console.log(solution([1,2,3,4,5]))
console.log(solution([1,3,2,4,2]))
