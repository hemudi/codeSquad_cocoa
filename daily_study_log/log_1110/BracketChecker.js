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
        return !this.stack.length; // 반환값이 뭔지 테스트해보자
    }

    getSize(){
        return this.stack.length;
    }

    getStack(){
        return this.stack;
    }
}

const stack = new Stack();

console.log(stack.isEmpty());
console.log(stack.push('one'));
console.log(stack.push('two'));
console.log(stack.getSize());
console.log(stack.getStack());
console.log(stack.peek());
console.log(stack.getSize());
console.log(stack.pop());
console.log(stack.getSize());
console.log(stack.isEmpty());
console.log(stack.pop());
console.log(stack.isEmpty());
console.log(stack.pop());

function run(data){

}