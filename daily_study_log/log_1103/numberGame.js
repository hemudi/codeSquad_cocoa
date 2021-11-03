/*

[Mission] 2진수 돌아가며 말하기 게임

문제 1) T개의 숫자까지 M명이 말하고 이를 모두 출력하는 프로그램

    [1] solution(진법, T, M) 값 입력받으며 호출
    [2] maxCount = T * M
    [3] for index = 0 to maxCount
            result += index.toString(진법)
    [4] result 출력

*/

function solution(baseNum, numCount, numPlayer){
    let maxCount = numCount * numPlayer;
    let result = '';

    for(index = 0; index < maxCount; index++){
        result += index.toString(baseNum);
    }

    console.log(result);
}

solution(2, 4, 2);