/*

[Mission] 2진수 돌아가며 말하기 게임

문제 1) T개의 숫자를 2진수로 변환 한 뒤 M명이 번갈아 말하고 이를 출력하는 프로그램
    * T개의 숫자 == 진수 변환 전 0부터 T-1 까지의 숫자 T개
    * 플레이어가 한 턴에 말해야할 숫자 != 변환 전 1개의 숫자
    * 플레이어가 한 턴에 말해야할 숫자 == 변환한 2진수의 숫자 하나
    * T개의 숫자의 이진수의 나열을 한글자씩 끊어서 말하는 것
        예시) 3개 숫자 2명의 플레이어
           1. 0~2 까지 2진수로 변환하여 나열 => 0110
           2. 게임 시작
                A) 0
                B) 1
                A) 1
                B) 0
           3. 게임 끝

    [1] solution(진법, 숫자 개수, 플레이어 수) 값 입력받으며 호출
    [2] for index = 0 to 숫자 개수 -1
            answer += index.toString(진법)
    [3] answer 배열로 변환하여 반환
    [4] solutions() 출력

*/

function solution(baseNum, numCount, numPlayer){
    let answer = '';

    for(index = 0; index < numCount; index++){
        answer += index.toString(baseNum);
    }

    return answer.split("");
}

console.log(solution(2, 4, 2));

