// 아직 구현 못하고 설계 중입니다...

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
    1. TaskDataManager : Task Data 들을 저장, 관리 => localStorage 도 여기서 사용...?
    2. ListController :  Add button click 이벤트가 발생하면 TaskDataManager 와 TaskCreator 에게 입력 정보 전송
    3. TaskEventManager : Task 의 추가 체크 삭제 이벤트들을 관리함
*/

class ListController {
    constructor(){
        this.taskDataManager = new TaskDataManager();
        this.taskEventManager = new TaskEventManager(this.removeButtonEventHandler);
    }

    init(){
        this.setButtonEvent();
    }

    setButtonEvent(){
        const $addButton = document.querySelector('#addBtn');
        $addButton.addEventListener('click', (e) => {this.addButtonEventHandler()});
    }

    addButtonEventHandler(){
        const $inputTask = document.querySelector('#taskInput');
        const $inputDate = document.querySelector('#dateInput');
        const taskValue = $inputTask.value;
        const dateValue = $inputDate.value;

        if(this.isFormEmpty(taskValue, dateValue)) return;
        // this.resetInput($inputTask, $inputDate);
        this.addTaskContents(taskValue, dateValue);
    }

    isFormEmpty(taskValue, dateValue){
        if(taskValue === ""){
            alert("할일을 입력해주세요!");
            return true;
        }

        if(dateValue === ""){
            alert("마감 날짜를 선택해주세요!");
            return true;
        }

        return false;
    }

    resetInput($inputTask, $inputDate){
        $inputTask.value = '';
        $inputDate.value = '';
    }

    addTaskContents(taskValue, dateValue){
        this.taskEventManager.addTaskElements(taskValue, dateValue);
        this.taskDataManager.saveTaskInfo(taskValue, dateValue);  // ok
    }

    removeButtonEventHandler(element){
        const $removeBtn = element.currentTarget;
        const $taskLi = $removeBtn.parentNode;
        const taskValue = $taskLi.querySelector('.contents').innerText;
        $taskLi.remove();
    }

    printTestLog(){
        console.log('테스트임당');
    }
}

class TaskDataManager {
    constructor(){
        this.taskArray = [];
    }

    saveTaskInfo(taskValue, dateValue){
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

// TaskEventHandler 가 나을까?
class TaskEventManager {
    constructor(removeBtnEventHandler){
        this.$taskList = document.querySelector('#taskList');
        this.removeBtnEventHandler = removeBtnEventHandler;
        this.count = 0;
    }

    addTaskElements(taskValue, dateValue){
        const $checkBox = this.createCheckBox();
        const $removeBtn = this.createRemoveButton();
        const $dateLabel = this.createLabel('date', dateValue);
        const $taskLabel = this.createLabel('contents', taskValue);
        const $taskLi = this.createLi($checkBox, $taskLabel, $dateLabel, $removeBtn);
        document.querySelector('#taskList').appendChild($taskLi);
        this.count++;
    }

    createCheckBox(){
        const $checkBox = document.createElement('input');
        $checkBox.type = 'checkbox';
        $checkBox.id = 'checkbox_' + this.count;
        $checkBox.addEventListener('click', (e) => {this.checkBoxClickEventHandler(e)})
        return $checkBox;
    }

    createLabel(className, value){
        const $label = document.createElement('label');
        $label.classList.add(className);
        $label.innerText = value;
        $label.htmlFor = 'checkbox_' + this.count;
        return $label;
    }

    createRemoveButton(){
        const $removeBtn = document.createElement('button');
        $removeBtn.classList.add('removeBtn');
        $removeBtn.innerText = '×';
        $removeBtn.addEventListener('click', (e) => {this.removeBtnEventHandler(e)});
        return $removeBtn;
    }

    createLi(...items){
        const $taskLi = document.createElement('li');
        for(const item of items){ $taskLi.append(item); }
        return $taskLi;
    }

    checkBoxClickEventHandler(e){
        const $checkBox = e.currentTarget;
        const childNodes = $checkBox.parentNode.childNodes;
        childNodes[1].classList.toggle('label_Checked');
        childNodes[2].classList.toggle('label_Checked');
    }
}

const listController = new ListController();
listController.init();