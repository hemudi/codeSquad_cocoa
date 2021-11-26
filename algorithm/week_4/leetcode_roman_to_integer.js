// LeetCode
// Roman to Integer
// https://leetcode.com/problems/roman-to-integer/

var romanToInt = function(s) {
    const romanSymbol= {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    return s.split("").reduceRight((acc, cur, i, arr)=>{
        if(i === arr.length -1) return romanSymbol[cur];

        if(romanSymbol[arr[i + 1]] > romanSymbol[cur]){
            return acc - romanSymbol[cur];
        }

        return acc + romanSymbol[cur];
    }, 0)
};

console.log(romanToInt("MCMXCIV"));
