/*
    #1110 괄호 문법 검사기

    [*]
    1. 여는 괄호인 경우
        - 괄호 스택에 push
        - depth ++
    2. 닫는 괄호인 경우
        - valueTemp 가 비어있지 않으면
            - valueCount ++
        - 짝이 아니면
            - 닫는 괄호가 일치하지 않다 출력
            - return false
    3. 콤마인 경우
        - valueCount ++
    4. 그 외의 경우(value 조각)
        - valueTemp += 
        
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
    const dataArray = data.split(''); 
    const bracketStack = new Stack();
    let depth = 0;
    let valueCount = 0;
    let valueTemp = '';

    for(const char of dataArray){

        // 왼쪽 괄호
        if(isLeftBracket(char)) {
            bracketStack.push(char);
            depth++;
            continue;
        }

        // 오른쪽 괄호
        if(isRightBracket(char)){
            if(valueTemp.length !== 0){
                valueTemp = '';
                valueCount++;
            }

            // 짝이 안맞으면
            if(!isPair(bracketStack.pop(), char)){
                console.log('닫는 괄호가 일치하지 않습니다!');
                return false;
            }

            continue;
        }

        // 콤마가 아닌 값
        if(!isComma(char)){
            valueTemp += char;  // 2자리 이상의 값일 수도 있어서
            continue;
        }

        valueCount++;
        valueTemp = '';
    }

    // 왼쪽 괄호 스택에 뭔가 남아있다 => 괄호 짝 안맞음
    if(!bracketStack.isEmpty()){
        console.log('닫는 괄호가 일치하지 않습니다.');
        return false;
    }

    console.log('배열의 중첩된 깊이 수준은 ' + depth + '이며, 총 ' + valueCount + '개의 원소가 포함되어 있습니다.');
    return true;    
}

function isLeftBracket(char){
    let regExp = /[\[\(\{]/g;
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

run('[1,2,[3,4,[5,[6]]]]');                              // true : 배열의 중첩된 깊이 수준은 4이며, 총 6개의 원소가 포함되어 있습니다.
run('[1,32,[3,4,46,[5,6,14,[646,[]]]]]');                // true : 배열의 중첩된 깊이 수준은 5이며, 총 9개의 원소가 포함되어 있습니다.
run('[1,32,[3,4,46,[5,6,14,[646,[[[[[[[o,t]]]]]]]]]]]'); // true : 배열의 중첩된 깊이 수준은 11이며, 총 11개의 원소가 포함되어 있습니다.

run('[1,2,[3,4,[5,[6]]');                                // false : 닫는 괄호가 일치하지 않습니다.
