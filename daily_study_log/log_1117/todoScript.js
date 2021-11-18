/*
    * TODO List 만들기
    [ ] 할 일 리스트에 추가하기
        - + 버튼 클릭시 아래 리스트에 할일 추가
        - 날짜나 할일 입력하지 않고 ADD 누르면 경고 메세지 출력
    [ ] 체크박스 클릭 시 비활성화
        - 글자에 빨간줄
        - 배경 색 바꾸기
    [ ] 할일 삭제
        - 삭제 버튼 클릭시 리스트에서 삭제

    * 클래스 구상
    1. TaskDataManager : Task Data 를 Array 로 저장
    2. ListController : TODO 리스트의 이벤트를 제어
    3. TaskCreator : Task li 를 생성...?
*/

// 할일 데이터 관리
class TaskDataManager {
    constructor(){
        this.taskArray = [];
    }

    addTask(taskValue, dateValue){
        this.taskArray.push({contents : taskValue, date : dateValue});
    }

    removeTask(taskValue){
        const index = this.getTaskIndex(taskValue);
        if(index >= 0) this.taskArray.splice(index, 1);
    }

    getTaskIndex(taskValue){
        let index = 0;
        const notExist = -1;
        for(const task of this.taskArray){
            if(task[contents] === taskValue){ return index; }
            index++;
        }
        return notExist;
    }

    getTaskArray(){
        return this.taskArray;
    }

    clearTaskArray(){
        this.taskArray = [];
    }
}

class ListController {
    constructor(taskDataManager, taskCreator){
        this.taskDataManager = taskDataManager;
        this.taskCreator = taskCreator;
    }

    init(){
        this.setButtonEvent();
    }

    setButtonEvent(){
        const buttonAdd = document.querySelector('#btn_add');
        buttonAdd.addEventListener('click', this.addButtonClickEvent);
    }

    addButtonClickEvent(){
        const $inputTask = document.querySelector('#input_task');
        const $inputDate = document.querySelector('#input_date');
        const taskValue = $inputTask.value;
        const dateValue = $inputDate.value;

        if(!this.checkInputValue(taskValue, dateValue)) return;

        this.formClear();
        this.addTake(taskValue, dateValue);
    }

    checkInputValue(taskValue, dateValue){
        if(taskValue === ""){
            alert("할일을 입력해주세요!");
            return false;
        }

        if(dateValue === ""){
            alert("마감 날짜를 선택해주세요!");
            return false;
        }

        return true;
    }

    formClear(){
        this.inputTask.value = '';
        this.inputDate.value = '';
    }

    addTake(taskValue, dateValue){
        this.taskDataManager.addTake(taskValue, dateValue);

    }

    removeTask(taskValue){
        this.taskDataManager.removeTask(taskValue);
    }

    consolePrint(){
        console.log('왜 안되는겨...');
    }
}

class TaskCreator{
    constructor() {
        
    }
}
