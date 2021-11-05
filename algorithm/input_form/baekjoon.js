// 백준
// 속도 때문에 readline 보단 fs 를 권장함

/*
    ex) test case
        good morning
        hello world!

    - 테스트 케이스는 파일로 존재
    - fs.readFileSync('/dev/stdin').toString() 을 통해 good morning\nhello world!\n 라는 문자열을 읽어들임
    - 여기서 split 을 통해 문자열을 \n 기준으로 끊어 배열로 반환
    - 이렇게 되면 input = ['good morning', 'hello world'] 와 같이 input 이 한 줄 씩 저장됨
*/

/*
    1. 입력 : 주어진 입력을 받아 프로그램의 자료구조에 저장
    2. 계산 : 알고리즘을 활용하여 정답 도출
    3. 출력 : 정답을 주어진 형식에 맞게 출력
    => 로직 도중 인터렉티브하게 유저로부터 입력을 받거나 출력을 요하지 않기 때문에 복잡한 readline 모듈보다는 fs 모듈로 간결하게 작성하는게 좋음
    
    * 주의 사항 : 계산시에는 pareInt, Number 함수를 통해 숫자로 형변환해야 에러가 발생하지 않음
    * 차이점 : Number는 숫자 + 문자가 혼합된 경우 NaN, parseInt 는 첫문자가 숫자라면 숫자 + 문자의 경우에도 숫자를 리턴

*/

// 한줄 입력
const fs = require('fs'); // file system 모듈을 불러옴

// fs 모듈의 readFileSync 함수를 통해 동기적으로 해당 경로의 파일 전체를 읽어드림
// 백준에서는 '/dev/stdin' 경로에 테스트 케이스 파일이 있음
// 읽어들인 정보는 toString() 함수를 통해 배열화 함 => split(''), split('\n') 등
// 예) 2 3 입력시, inputData = ['2', '3']

let input = fs.readFileSync('/dev/stdin').toString().split('n');

// option
const input2 = fs.readFileSync(0, 'utf8').split(' ');

console.log(input);

// 여러줄 입력
const solution = (N, data) => {
    console.log(N);
    console.log(data);
}

let fs = require('fs');
let input = fs.readFileSync('test').toString().split('\n');

const N = +input[0];
const data = [];

for(let i = 1; i < N + 1; i++){
    // 위에서 N을 받을때 input[0] 이 빠져나갔기 때문에 1~N 을 받아야함
    data.push(input[i].split(' ').map((el) => +el));
}

solution(N, data);

// 여러줄 입력 + info
const solution = (N, info, data) => {
    console.log(N);
    const [X, Y] = info;
    console.log(X, Y);
    console.log(data);
};

let fs = require('fs');
let input = fs.readFileSync('test2').toString().split('\n');

const N = +input[0];
const info = input[1].split(' ').map((el) => +el);
const data = [];

for(let i = 2; i < N+2; i++){
    data.push(input[i].split(' ').map((el) => + el));
}

solution(N, info, data);

