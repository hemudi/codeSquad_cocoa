/*
    #1110 괄호 문법 검사기

    [스택]
    - 클래스 + 배열로 생성
    - push() : 최상단에 데이터 입력 => 배열의 맨 끝에
    - pop() : 최상단의 데이터를 하나 꺼내고 삭제 => 배열의 pop() 그대로 써도 되나
    - peek() : 최상단의 데이터를 꺼내고 삭제는 안함
    - isEmpty() : 스택이 비어있는지 체크 => length 길이로 체크
    - init() : 스택 초기화 => array = [] 로 새로 생성
    - getSize() : 스택의 크기 반환
    
    [괄호 매칭 검사]
    - 스택에 여는 괄호를 하나씩 넣음
    - 닫는 괄호가 나오면 스택에서 하나씩 꺼내서 비교
    =>  반복문으로 하나 만들고 재귀로 하나 더 만들어보자

    [run(data)]
    - 입력받은 문자열을 문자 배열에 입력 => split()
    - 괄호 담을 스택 생성
    - 문자 배열의 문자들을 정규식을 이용해 괄호인지 아닌지 판별 
    - 중첩 깊이 수준은 닫는 괄호를 만날때까지 스택에 쌓인 괄호의 개수
    - 원소의 개수는 입력된 문자열 길이 - 중첩된 깊이 * 2 
    
    [배열 분석 정보]
    - type, child, value 속성을 가지는 객체 생성해서 정보 담기?
 */

class Stack {
    constructor() {
        this.stack = [];
    }

    push(data) {
        this.stack.push(data);
    }

    pop(){
        if(this.isEmpty()) return 'is Empty';
        return this.stack.pop();
    }

    peek(){
        if(this.isEmpty()) return 'is Empty';
        return this.stack[this.getSize() - 1];
    }

    isEmpty(){
        return !this.stack.length;
    }

    getSize(){
        return this.stack.length;
    }

    getStack(){
        return this.stack;
    }
}

function run(data){
    const dataArray = data.split(''); // data 원본 유지 필요 없으면 data = data.split('');
    const bracketStack = new Stack();
    const values = [];
    let valueTemp = '';
    let depth = 0;

    for(const char of dataArray){

        if(isLeftBracket(char)) {
            bracketStack.push(char);
            depth++;
            continue;
        }

        if(isRightBracket(char)){
            if(valueTemp.length !== 0){
                values.push(valueTemp);
                valueTemp = '';
            }

            if(!isPair(bracketStack.pop(), char)){
                console.log('닫는 괄호가 일치하지 않습니다!');
                return false;
            }

            continue;
        }

        if(!isComma(char)){
            valueTemp += char;
            continue;
        }

        values.push(valueTemp);
        valueTemp = '';
    }

    if(!bracketStack.isEmpty()){
        console.log('닫는 괄호가 일치하지 않습니다.');
        return false;
    }

    console.log('배열의 중첩된 깊이 수준은 ' + depth + '이며, 총 ' + values.length + '개의 원소가 포함되어 있습니다.');
    return true;    
}

function isLeftBracket(char){
    let regExp = /[\[\(\{})]/g;
    let isBracket = regExp.test(char);
    return isBracket;
}

function isRightBracket(char){
    let regExp = /[\)\}\]]/g;
    let isBracket = regExp.test(char);
    return isBracket;
}

function isPair(left, right){
    const brackets = {
        '(' : ')',
        '{' : '}',
        '[' : ']'
    }

    let result = brackets[left] === right;

    return result;
}

function isComma(char){
    return char === ',';
}

run('[1,2,[3,4,[5,[6]]]]');  // => true
run('[1,2,[3,4,[5,[6]]]]');  // => false