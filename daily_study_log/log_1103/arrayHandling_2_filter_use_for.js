// 배열 다루기 문제 2번 배열 거르기 use for문
/*
    [문제 2] 주어진 사람들 중 아래 조건을 만족하는 사람들로 구성된 배열 만들어 반환
        (조건)
            - 특수 기호가 없는 아이디 제외
            - 아이디에서 숫자를 제거
            - for/while 문 사용 

        [*] 특수 기호 아이디 판별
        [*] checkSpecialChar(아이디)
        [1] const specialCharPattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        [2] if(specialCharPattern.test(아이디)) -> true return 
        [3] false return

        [*] 아이디에서 숫자 제거
        [*] removeNumInID(아이디)
        [1] 처리 후 아이디 = '' 변수 선언
        [2] for index = 0 to 아이디.length
                if(isNaN(아이디[index]) == false)
                    처리 후 아이디 += 아이디[index]
        [3] 처리 후 아이디 반환
        ==> replace 좋은 듯

        [*] 거르기
        [*] filterId(peoples)
        [1] resultArray = []
        [2] for index = 0 to peoples.length
        [3]     if(checkSpecialChar(peoples[index])) continue
                
                resultArray.push(removeNumInId(peoples[index]))
        [4] return resultArray
	
*/

const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

function filterId(idArray){
    let filteredArray = []

    for(let value of idArray){
        if(checkSpecialChar(value)) continue;
        filteredArray.push(removeNum(value));
    }

    return filteredArray;
}

function checkSpecialChar(id){
    const specialCharPattern = /[!?@#$%^&*():;+=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/gi;
    return specialCharPattern.test(id);
}

function removeNum(id){
    const numberPattern = /[0-9]/;
    return id.replace(numberPattern, '');
}

console.log(filterId(peoples));


/* replace() 알기 전 구현한 removeNumInId */

// function removeNumInId(id){
//         let removedId = '';
    
//         for(let value of id){
//             if(isNaN(value)){
//                 removedId += value;
//             }
//         }
    
//         return removedId;
//     }