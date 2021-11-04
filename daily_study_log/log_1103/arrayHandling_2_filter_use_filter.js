/*
    - filter + forEach + replace 사용한 버전
*/


const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

function filterId(idArray){
    let filteredArray = idArray.filter(isCharacter);

    return removeNum(filteredArray);
}

function isCharacter(str){
    const specialCharPattern = /[!?@#$%^&*():;+=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/gi;
    return specialCharPattern.test(str) == false;
}

function removeNum(strArray){
    let resultArray = [];
    const numberPattern = /[0-9]/;

    strArray.forEach(function(element){
        resultArray.push(element.replace(numberPattern, ''));
    })

    return resultArray;
}

console.log(filterId(peoples));