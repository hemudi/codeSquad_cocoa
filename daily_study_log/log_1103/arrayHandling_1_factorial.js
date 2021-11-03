// 배열 다루기 문제 1번 factorial 함수
/*
    [문제 1] 임의의 숫자 m 을 입력받아 1부터 m까지의 factorial 값을 배열로 담아 반환하는 함수

    [방법 1]
    [*] calculate_sol1(m)
    [1] 결과 = [] 변수 선언
    [2] 현재 숫자 = 1 변수 선언
    [3] 현재 결과 = 1 변수 선언
    [4] while( 현재 숫자 <= m )
            현재 결과 *= 현재 숫자
            결과.push(현재 결과)
            현재 숫자++
    [5] 결과 반환

    [방법 2]
    [*] calculate_sol2(결과, m)
    [1] 결과 = []
    [2] factorial(결과, m)
        [2 - 1] if(m === 1)
                    결과.push(1)
                    return 1
        [2 - 2] 현재 값 = m * factorial(결과, m - 1) 
        [2 - 3] 결과.push(현재 값)
        [2 - 4] 현재 값 반환

    [3] 결과 반환

*/

function calculate_sol1(maxValue){
    let resultArray = [];
    let currentNum = 1;
    let currentValue = 1;

    while(currentNum <= maxValue){
        currentValue *= currentNum;
        resultArray.push(currentValue);
        currentNum++;
    }

    return resultArray;
}

function calculate_sol2(maxValue){
    let resultArray = [];
    let result = factorial(resultArray, maxValue);

    return resultArray;
}

function factorial(resultArray, currentNum){
    if(currentNum === 1){
        resultArray.push(1);
        return 1;
    }

    let currentValue = currentNum * factorial(resultArray, currentNum - 1);
    resultArray.push(currentValue);
    
    return currentValue;
}

/* 방법 1 테스트 */
console.log(calculate_sol1(4));
console.log(calculate_sol1(5));
console.log(calculate_sol1(10));

/* 방법 2 테스트 */
console.log(calculate_sol2(4));
console.log(calculate_sol2(5));
console.log(calculate_sol2(10));

