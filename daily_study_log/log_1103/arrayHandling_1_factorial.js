// 배열 다루기 문제 1번 factorial 함수
/*
    [문제 1] 임의의 숫자 m 을 입력받아 1부터 m까지의 factorial 값을 배열로 담아 반환하는 함수

    [방법 1]
    [*] calculate(m)
    [1] 결과 = [1] 변수 선언
    [2] 현재 숫자 = 2 변수 선언
    [3] 현재 결과 = 0 변수 선언
    [4] while( 현재 숫자 <= m )
            현재 결과 = 결과[현재 숫자 - 1] * 현재 숫자
            결과.push(현재 결과)
            현재 숫자++
    [5] 결과 반환

*/

function calculate(maxValue){
    let resultArray = [1];
    let currentNum = 2;
    let currentValue = 0;

    while(currentNum <= maxValue){
        currentValue = resultArray[currentNum - 1] * currentNum;
        resultArray.push(currentValue);
        currentValue++;
    }

    return resultArray;
}

console.log(calculate(3));
