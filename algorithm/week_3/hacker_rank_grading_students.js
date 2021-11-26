// Hacker Rank
// Grading Students
// https://www.hackerrank.com/challenges/grading/problem

function gradingStudents(grades) {
    let roundedGrades = [];
    grades.forEach((grade) => {
        if ((grade < 38) || ((5 - grade % 5) >= 3)) return roundedGrades.push(grade);   
        grade = grade + (5 - grade % 5); roundedGrades.push(grade);
    })
    return roundedGrades;
}