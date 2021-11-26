// LeetCode
// Palindrome Number
// https://leetcode.com/problems/palindrome-number/
var isPalindrome = function(x) {
    if(x < 0) return false; 
    const numStr = Math.abs(x).toString();
    let left = 0;
    let right = numStr.length - 1;

    while(left < right){
        if(numStr[left++] !== numStr[right--]) return false;
    }

    return true;
};

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));
console.log(isPalindrome(-101));
console.log(isPalindrome(101));

