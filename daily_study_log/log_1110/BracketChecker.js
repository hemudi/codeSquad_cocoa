// 리팩토링 필요...
// 배열 데이터 저장하는걸 따로 뺄까?... => 재귀로 구현?

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

    [*]
    1. 여는 괄호인 경우
        - 괄호 스택에 push
        - depth ++
        - dataInfo 의 child 에 type:array 객체 추가하고 childInfo 로 설정
    2. 닫는 괄호인 경우
        - valueTemp 가 비어있지 않으면
            - type:value 객체 생성 후 child 로 추가
            - valueCount ++
        - 짝이 아니면
            - 닫는 괄호가 일치하지 않다 출력
            - return false
    3. 콤마인 경우
        - type:value 객체 생성 후 child 로 추가
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

let dataObject = {
    type : 'root',
    child : []
}

function run(data){
    const dataArray = data.split(''); // data 원본 유지 필요 없으면 data = data.split('');
    const bracketStack = new Stack();
    let valueTemp = '';
    let depth = 0;
    let valueCount = 0;
    let currentObject = dataObject;
    let childArrayObject;

    for(const char of dataArray){
        if(isLeftBracket(char)) {
            bracketStack.push(char);
            depth++;
            childArrayObject = getChildObject('array');
            currentObject['child'].push(childArrayObject);
            currentObject = childArrayObject;
            continue;
        }

        if(isRightBracket(char)){
            if(valueTemp.length !== 0){
                currentObject['child'].push(getChildObject('value', valueTemp));
                valueTemp = '';
                valueCount++;
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

        currentObject['child'].push(getChildObject('value', valueTemp));
        valueCount++;
        valueTemp = '';
    }

    if(!bracketStack.isEmpty()){
        console.log('닫는 괄호가 일치하지 않습니다.');
        return false;
    }

    console.log('배열의 중첩된 깊이 수준은 ' + depth + '이며, 총 ' + valueCount + '개의 원소가 포함되어 있습니다.');
    console.dir(dataObject, {depth : null});
    return true;    
}

function getChildObject(type, value = 0){
    let childObject = new Object();
    childObject['type'] = type;

    if(type === 'value'){
        childObject['value'] = value;
    }

    childObject['child'] = [];

    return childObject;
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

run('[1,2,[3,4,[5,[6]]]]');                              // true : 배열의 중첩된 깊이 수준은 4이며, 총 6개의 원소가 포함되어 있습니다.
run('[1,32,[3,4,46,[5,6,14,[646,[]]]]]');                // true : 배열의 중첩된 깊이 수준은 5이며, 총 9개의 원소가 포함되어 있습니다.
run('[1,32,[3,4,46,[5,6,14,[646,[[[[[[[o,t]]]]]]]]]]]'); // true : 배열의 중첩된 깊이 수준은 11이며, 총 11개의 원소가 포함되어 있습니다.

run('[1,2,[3,4,[5,[6]]');                                // false : 닫는 괄호가 일치하지 않습니다.



