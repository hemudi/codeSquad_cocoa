import data from './exampleData.js';

/*
 - 재귀를 써서 object 가 아닐때까지 순회를 하는겨
 - 종료 조건은 object 가 아닐때
    - 이때 값이 숫자면 결과 배열에 추가

*/

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