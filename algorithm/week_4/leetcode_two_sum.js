// LeetCode
// Two Sum
// https://leetcode.com/problems/two-sum/

var twoSum = function(nums, target) {
    for(let left = 0; left < nums.length; left++){
        for(let rigth = left + 1; rigth < nums.length; rigth++){
            if(target - nums[left] === nums[rigth]){
                return [left, rigth];
            }
        }
    }
    
    return null;
};