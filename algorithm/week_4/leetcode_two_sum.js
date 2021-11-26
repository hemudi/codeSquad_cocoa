// LeetCode
// Two Sum
// https://leetcode.com/problems/two-sum/

var twoSum = function(nums, target) {
    for(let left = 0; left < nums.length; left++){
        for(let right = left + 1; right < nums.length; right++){
            if(target - nums[left] === nums[right]){
                return [left, right];
            }
        }
    }
    
    return null;
};