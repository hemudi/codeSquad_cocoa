// 평균 구하기
/*
    - 네 명의 학생에 대한 과목 점수
    - 각각 3가지 과목에 대한 점수를 가지고 있음
    - 각 학생의 [1]평균점수와 모든 학생의 [2] 최고 점수의 평균점수를 출력

    * 평균 점수를 구하는 함수 하나 만들고 => getAverage()
    * 최고 점수들을 구하는 함수 만들고 => getHighGrade()
    * [1] 번은 => getAverage()
    * [2] 번은 => getHighGrade() => getAverage()

*/

const grades = [[88,76,77],[33,44,44],[90,100,94],[30,44,98]];

// 학생 별 평균 반환
function getAverageOfStudent(grades){
    let avarageGradeList = [];

    grades.forEach(studentInfo => {
        avarageGradeList.push(getAverage(studentInfo));
    });

    return avarageGradeList;
}

// 학생들의 최고 점수의 평균 반환
function getHighGradeAverage(grades){
    let highGrades = [];

    grades.forEach(studentInfo => {
        highGrades.push(getHighGradeOfStudent(studentInfo));
    })

    return getAverage(highGrades);
}

// 최고 점수 반환
function getHighGradeOfStudent(grades){
    let highGrade = 0;

    grades.forEach(grade => {
        if(highGrade < grade) {
            highGrade = grade;
        }
    })

    return highGrade;
}

// 평균 반환
function getAverage(valueArray){
    let gradesSum = 0;
    let average;

    valueArray.forEach(element => {
        gradesSum += element;
    });

    average = (gradesSum / valueArray.length).toFixed(1);
    return average;  // 반올림
}

console.log("> [1] 학생 별 평균 점수 : " + getAverageOfStudent(grades));
console.log("> [2] 최고 점수의 평균 점수 : " + getHighGradeAverage(grades));