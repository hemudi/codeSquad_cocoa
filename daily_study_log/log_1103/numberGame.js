/*

[Mission] 2진수 돌아가며 말하기 게임

문제 1) 각각 T개의 숫자를 M명이 번갈아 말하고 이를 모두 출력하는 프로그램
    * 1개의 숫자 == 진수 변환 전 숫자 1개

    [1] solution(진법, T, M) 값 입력받으며 호출
    [2] maxCount = T * M
    [3] for index = 0 to maxCount
            result += index.toString(진법)
    [4] result 출력

    // 배열로 바꿔서 출력
    [4-2] result.split(""); 출력
          => 출력 형태 ['0', '1', '1', ... , '1']

*/

function solution(baseNum, numCount, numPlayer){
    let maxCount = numCount * numPlayer;
    let result = '';

    for(index = 0; index < maxCount; index++){
        result += index.toString(baseNum);
    }

    let resultArr2 = result.split("");

    console.log(resultArr2);
}

solution(2, 4, 2);