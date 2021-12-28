/*
    [ 배열 만들기 ]
    - value 가 object 가 아닐때까지 재귀로 순회
        - value 가 object 가 아니면 그 값의 타입이 number 인지 체크 맞다면 결과 배열에 추가
    - value 가 object 라면 key 순회하며 search 재귀 호출
*/

import data from './data/exampleData.js';
function getNumTypeValues(data) {
    const result = [];
    const search = (key, value) => {
        if(typeof value !== 'object'){
            (typeof value === 'number') ? result.push(key) : null;
            return;
        }

        for(const key of Object.keys(value)){
            search(key, value[key]);
        }
    }
    search(null, data);
    return result;
}

console.log(getNumTypeValues(data));