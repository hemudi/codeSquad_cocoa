/*
    [ reduce 만들기 ]
    - array 의 reduce 메서드처럼 동작하는 myReduce 만들기
*/

// arr : 입력된 배열
// callback(reducer 함수) => (acc, cur, idx, src) => (누산기, 현재값, 현재 인덱스, 원본 배열)
// initialValue : 초기값
const myReduce = (arr, callback, initialValue) => {
    let acc = initialValue ? initialValue : arr[0];
    let idx = initialValue ? 0 : 1;
    
    for(;idx < arr.length; idx++){
        acc = callback(acc, arr[idx], idx, arr);
    }

    return acc;
}

const reducer = (pre, cur) => { return pre + cur; }
const arrayReducer = (acc, cur) => {
    acc.push(cur % 2 ? '홀수' : '짝수');
    return acc;
}

console.log(myReduce([1,2,3], reducer));
console.log(myReduce([1,2,3], arrayReducer, []));