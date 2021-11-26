// Leet
// Reverse Integer
// https://leetcode.com/problems/reverse-integer/

var reverse = function(x) {
    const numStr = Math.abs(x).toString();
    let resultStr = '';

    for(let index = numStr.length-1; index > -1; index--){
        if(numStr[index] === '0' && resultStr.length === 0) continue;
        resultStr += numStr[index];
    }

    if(x < 0){
        resultStr = '-' + resultStr;
    }

    if(!checkRange(resultStr)) return 0;
    return resultStr;
}

let checkRange = function(value) {
    if(value < Math.pow(-2, 31) || value > Math.pow(2, 31) - 1) return false;
    return true;
}

console.log(reverse(1534236469));
