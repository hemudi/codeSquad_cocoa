// LeetCode
// Merge Two Sorted Lists
// https://leetcode.com/problems/merge-two-sorted-lists/
var mergeTwoLists = function(list1, list2){
    let currentNode = new ListNode();
    let headNode = currentNode;
    
    while(list1 !== null && list2 !== null){
        if(list1.val < list2.val){
            currentNode.next = list1;
            list1 = list1.next;
        } else {
            currentNode.next = list2;
            list2 = list2.next;
        }

        currentNode = currentNode.next;
    }

    currentNode.next = list1 !== null ? list1 : list2;
    return headNode.next;
}
