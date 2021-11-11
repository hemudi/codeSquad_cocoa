// 리팩토링 필요...함수 쪼개야함
// 배열 데이터 저장하는걸 따로 뺄까?... => 재귀로 구현?

/*
    #1110 괄호 문법 검사기

    [*]
    1. 여는 괄호인 경우
        - 괄호 스택에 push
        - depth ++
        - dataInfo 의 child 에 type:array 객체 추가하고 childInfo 로 설정
    2. 닫는 괄호인 경우
        - valueTemp 가 비어있지 않으면
            - type:value 객체 생성 후 child 로 추가
            - valueCount ++
        - 괄호 스택에서 pop 하고 비교
            - 짝이 아니면
                - 닫는 괄호가 일치하지 않다 출력
                - return false
    3. 콤마인 경우
        - type:value 객체 생성 후 child 로 추가
        - valueCount ++
    4. 그 외의 경우(value 조각)
        - valueTemp += 

    5. 반복문 끝나고 스택에 남아있는게 있는지 체크
        - 남아있으면 짝 안맞음 => false
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
    const dataArray = data.split('');
    const bracketStack = new Stack();
    let depth = 0;
    let valueTemp = '';
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

function getChildObject(type, value = 0){
    let childObject = new Object();
    childObject['type'] = type;

    if(type === 'value'){
        childObject['value'] = value;
    }

    childObject['child'] = [];

    return childObject;
}

run('[1,2,[3,4,[5,[6]]]]');                              
/*
    # 출력 결과
    배열의 중첩된 깊이 수준은 4이며, 총 6개의 원소가 포함되어 있습니다.
{
  type: 'root',
  child: [
    {
      type: 'array',
      child: [
        { type: 'value', value: '1', child: [] },
        { type: 'value', value: '2', child: [] },
        {
          type: 'array',
          child: [
            { type: 'value', value: '3', child: [] },
            { type: 'value', value: '4', child: [] },
            {
              type: 'array',
              child: [
                { type: 'value', value: '5', child: [] },
                {
                  type: 'array',
                  child: [ { type: 'value', value: '6', child: [] } ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
*/

run('[1,32,[3,4,46,[5,6,14,[646,[]]]]]');                // true : 배열의 중첩된 깊이 수준은 5이며, 총 9개의 원소가 포함되어 있습니다.
run('[1,32,[3,4,46,[5,6,14,[646,[[[[[[[o,t]]]]]]]]]]]'); // true : 배열의 중첩된 깊이 수준은 11이며, 총 11개의 원소가 포함되어 있습니다.

run('[1,2,[3,4,[5,[6]]');                                // false : 닫는 괄호가 일치하지 않습니다.
