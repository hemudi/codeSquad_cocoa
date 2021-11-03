// [Mission] 2진수 돌아가며 말하기 게임

/* 
    문제 1) T개의 숫자를 2진수로 변환 한 뒤 M명이 번갈아 말하고 이를 출력하는 프로그램
        
        * T개의 숫자 == 진수 변환 전 0부터 T-1 까지의 숫자 T개
        * 플레이어가 한 턴에 말해야할 숫자 != 변환 전 1개의 숫자
        * 플레이어가 한 턴에 말해야할 숫자 === 변환한 2진수의 숫자 하나
        * T개의 숫자의 이진수의 나열을 한글자씩 끊어서 말하는 것
          예시) 3개 숫자 2명의 플레이어
             1. 0~2 까지 2진수로 변환하여 나열 => 0110
             2. 게임 시작
                A) 0
                B) 1
                A) 1
                B) 0
             3. 게임 끝

        [*] getFullAnswer(진법, 숫자 개수, 플레이어 수)
        [1] answer 빈 문자열 선언
        [2] for index = 0 to 숫자 개수 -1
                answer += index.toString(진법)
        [3] answer 배열로 변환하여 반환

    문제 2-1) 길동이의 차례에 어떤 숫자를 말해야 하는지 전부 기록

        [*] getPlayerAnswers(전체 답, 플레이어 수, 길동이 순서)
        [1] 길동이 답 모음 빈 배열 선언
        [2] 현재 순서 = 길동이 시작 순서 - 1
        [3] while(현재 순서 < 전체 답 개수)
                길동이 답 모음 <- 전체답[현재 순서]
                현재 순서 += 플레이어 수
        [4] 길동이 답 모음 반환

    문제 2-2) 길동이가 본인의 n 번째 순서에 말한 답 구하기

        * 길동이가 n 번째로 말한 답 = "길동이 순서 + [(플레이어 수 * (n-1)]"" 번째의 수
    
        [*] getPlayerAnswerAtThatTime(전체 답, 플레이어 수, 길동이 순서, n번째) 
        [1] numIndex = 길동이 순서 + 플레이어 수 * (n - 1) - 1
        [2] 전체 답[numIndex] 반환
    
    문제 3) n진수까지 되는 프로그램

        * number.toString(진수)으로 구현하니까 딱히 수정할거 없이 결과가 나옴
*/

function solution(baseNum, numCount, numPlayer, playerOrder){
    let fullAnswer = [];
    let playerAnswers = [];

    fullAnswer = getFullAnswer(baseNum, numCount);
    playerAnswers = getPlayerAnswers(fullAnswer, numPlayer, playerOrder)

    console.log(`[ ${baseNum} 진수 게임]`);
    console.log(`>> 숫자 개수 : ${numCount}, 참여자 수 : ${numPlayer}`);
    console.log(`>> 전체 답 : ${fullAnswer}`);
    console.log(`>> ${playerOrder}번째인 길동이가 말한 답 : ${playerAnswers}`);
}

// 참여자 전체 답
function getFullAnswer(baseNum, numCount){
    let answer = '';

    for(index = 0; index < numCount; index++){
        answer += index.toString(baseNum);
    }

    return answer.split("");
}

// 길동이가 말한 답 전체
function getPlayerAnswers(fullAnswer, numPlayer, playerOrder){
    let playerAnswers = [];
    let currentOrder = playerOrder - 1;

    while(currentOrder < fullAnswer.length){
        playerAnswers.push(fullAnswer[currentOrder]);
        currentOrder += numPlayer;
    }

    return playerAnswers;
}

// 길동이가 자신의 n 번째 차례에 말한 답 하나
function getPlayerAnswerAtThatTime(fullAnswer, numPlayer, playerOrder, times){
    let numIndex = playerOrder + numPlayer * (times - 1) - 1
    let playerAnswer = fullAnswer[numIndex];

    return playerAnswer;
}

// 위의 함수 결과 출력용
function printPlayerAnswerAtThatTimer(baseNum, numCount, numPlayer, playerOrder, times){
    let logStr = `> 이번 ${baseNum}진수 게임의 ${numPlayer}명의 플레이어 중 ${playerOrder}번째 순서의 플레이어가 ${times}번째에 말한 답은 `;
    let fullAnswer = getFullAnswer(baseNum, numCount);

    logStr += getPlayerAnswerAtThatTime(fullAnswer, numPlayer, playerOrder, times);
    console.log(logStr);
    // console.log(`> 전체 답 : ${fullAnswer}`);
}

/* TEST */
// solution(2, 4, 2, 2);
// solution(2, 5, 6, 4);
// solution(2, 4, 3, 2);

solution(2, 10, 6, 5);
printPlayerAnswerAtThatTimer(2, 10, 6, 5, 3);

solution(16, 18, 2, 2);
printPlayerAnswerAtThatTimer(16, 18, 2, 2, 4);
