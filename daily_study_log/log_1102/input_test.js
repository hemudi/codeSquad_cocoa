/* 1102 Node.js readline 표준 입출력 연습해본 소스코드 => 정리 필요 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('이름이 뭐야? ', (answer) => {
//     console.log(answer + '는 바보');
//     rl.close();
// });


// 여러개 입력받기 => 실패함
// rl.question('입력 예) rect 10 15 => ', (shape, ...size) =>{
//     console.log('모양 : ' + shape + ' => size : ' + size);
//     rl.close();
// });

// let input = [];

let input;
let list = [];
r1.on("line", function(line){
    //line 을 통해 사용자가 입력한 문자열이 들어옴
    input = line;
    //한줄을 받고 입력 종료
    r1.console();
}).on("close", function(){
    //한줄에 입력된 값을 띄어쓰기 기준으로 list 배열에 삽입.
    list.push(input.split(' ').map((el) => el));

    //입력된 문자열이 전부 정수라면 parseInt로 형변환
    list.push(input.split(' ').map((e1) => parseInt(e1)));

    //개발 로직
    solution(list);

    //프로세스 종료
    process.exit();
})
