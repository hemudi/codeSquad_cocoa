// 프로그래머스
// 크레인 인형 뽑기
// https://programmers.co.kr/learn/courses/30/lessons/64061

function solution(board, moves){
    var answer = 0;
    let basket = [];

    for(const move of moves){
        for(let depth = 0; depth < board[move - 1].length; depth++){
            if(board[depth][move-1] != 0){
                basket.push(board[depth][move-1]);
                board[depth][move-1] = 0;
                break;
            }
        }

        if(basket.length >= 2){
            if(basket[basket.length - 1] === basket[basket.length - 2]){
                basket.pop();
                basket.pop();
                answer += 2;
            }
        }
    }

    return answer;
}

console.log(solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]));