// 프로그래머스
// 2016년
// https://programmers.co.kr/learn/courses/30/lessons/12901

function solution(a, b) {
    var answer = 0;
    const month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const week = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
    SUN,MON,TUE,WED,THU,FRI,SAT

    while(a - 2 >= 0){
        answer += month[a-- - 2];
    }

    answer = week[(answer + b) % 7];
    return answer;
}