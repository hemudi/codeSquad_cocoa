/* 
    [ 배열 결과 출력 ]
    - childnode 의 type === sk 인지 판별하고 맞다면 result 에 push
    - childenode 의 childnode 배열을 반복문으로 돌려버리기 
        => childnode 가 없다면 반복문 안돌아서 자동으로 종료
*/
// 참고 글 : https://velog.io/@kingth/js%EC%97%90%EC%84%9C-json%ED%8C%8C%EC%9D%BC-import-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95

import jsonTree from './data/json_tree.js';
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