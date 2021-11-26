// LeetCode
// Longest Common Prefix
// https://leetcode.com/problems/longest-common-prefix/

var longestCommonPrefix = function(strs) {
    let result = '';
    if(strs.length === 1) return strs[0];

    for(let x = 0; x < strs[0].length; x++){
        for(let y = 1; y < strs.length; y++){
            if(strs[0][x] !== strs[y][x]){
                return result;
            }
        }
        result += strs[0][x];
    }
    
    return result;
};

console.log(longestCommonPrefix(["cir","car"]));