const readline = require("readline");
const std = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

// std.on('line', (line) => {
//     input = line.split(' ').map(el => Number(el));
//     console.log(input[0] + input[1]);
//     std.close();
// }).on('close', () => process.exit());

// 한줄 입력 받기
// std.on("line", function (line){
//     console.log(line);
//     std.close();
// }).on("close", function(){
//     process.exit();
// })

// 공백을 기준으로 입력받는 방법
// let input = [];
// std.on("line", function (line) {
//     input = line.split(' ').map((el) => parseInt(el));
//     std.close();
// }).on("close", function () {
//     console.log(input);
//     process.exit();
// });

// question 사용
std.question("질문 : ", answer => {
    console.log(`Thank you : ${answer}`);
    std.close();
})

