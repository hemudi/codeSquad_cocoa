// 구름에서 제공하는 입력 코드
// case 1
const readline = require('readline');
const rl = readling.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', function(line) {
    console.log(line);
    rl.close();
}).on('close', function(){
    process.exit();
});


// case 2
const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    for await (const line of rl){
        console.log('Hello Goorm! Your input is', line);
        rl.close();
    }

    process.exit();
})();

/*
    - 입력되는 값을 line 에서 한줄씩 읽어들임.
    - rl.close(); 를 호출하면 case 1 에서는 on("close") 의 콜백인 process.exit() 를 호출하여 프로세스를 종료함, case 2 도 마찬가지
    - 만약 rl.close(); 를 지우면 사용자가 엔터를 치더라도 값을 계속 입력할 수 있는 상태가 됨. => 이때는 종료하려면 ctrl+c 를 입력
*/

