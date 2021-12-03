function solution(baseNum, numCount){
    let answer = '';

    for(index = 0; index < numCount; index++){
       answer += index.toString(baseNum);
   }
    return answer.split("");
}

function getPlayerAnswer(fullAnswer, numPlayer, playerOrder, times){
    let numIndex = playerOrder + numPlayer * (times - 1) - 1
    let playerAnswer = fullAnswer[numIndex];

    return playerAnswer;
}

function printPlayerAnswer(baseNum, numCount, numPlayer, playerOrder, times){
    let logStr = `이번 ${baseNum}진수 게임의 ${numPlayer}명의 플레이어 중 ${playerOrder}번째 순서의 플레이어가 ${times}번째에 말한 답은 `;
    let fullAnswer = solution(baseNum, numCount);

    logStr += getPlayerAnswer(fullAnswer, numPlayer, playerOrder, times);

    console.log(logStr);
    console.log(`전체 답 : ${fullAnswer}`);
}

printPlayerAnswer(2, 4, 2, 2, 3);