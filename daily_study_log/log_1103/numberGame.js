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

    // 말한 숫자 구분되게 출력
    [3-2] for index = 0 to maxCount
            result(배열) <= push "index.toString(진법)"
    [4-2] result 출력
           => 출력 형태 ['0', '1', '10', '11', '100', '101', '110', '111']

*/

function solution(baseNum, numCount, numPlayer){
    let maxCount = numCount * numPlayer;
    let resultArr = [];

    for(index = 0; index < maxCount; index++){
        resultArr.push(index.toString(baseNum));
    }

    console.log(resultArr);
}

solution(2, 4, 2);