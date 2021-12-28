/*
    [ 미션 1. 배열 만들기 ]
    - value 가 object 가 아닐때까지 재귀로 순회
        - value 가 object 가 아니면 그 값의 타입이 number 인지 체크 맞다면 결과 배열에 추가
    - value 가 object 라면 key 순회하며 search 재귀 호출
*/

import data from './exampleData.js';
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

/* 
    [ 미션 2. 배열 결과 출력 ]
    - childnode 의 type === sk 인지 판별하고 맞다면 result 에 push
    - childenode 의 childnode 배열을 반복문으로 돌려버리기 
        => childnode 가 없다면 반복문 안돌아서 자동으로 종료
*/

import jsonTree from './json_tree.js';
function getNamesOfSk(data) {
    const result = [];
    const search = (node) => {
        if(node['type'] === 'sk'){
            result.push(node['name']);
        }
        
        for(const child of node['childnode']){
            search(child);
        }
    }

    search(data.pop());
    return result;
}

console.log(getNamesOfSk(jsonTree));