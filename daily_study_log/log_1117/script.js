/*
    * TODO List 만들기
    [X] 할 일 리스트에 추가하기
        - + 버튼 클릭시 아래 리스트에 할일 추가
        - 날짜나 할일 입력하지 않고 ADD 누르면 경고 메세지 출력
    [ ] 체크박스 클릭 시 비활성화
        - 글자에 빨간줄
        - 배경 색 바꾸기
    [X] 할일 삭제
        - 삭제 버튼 클릭시 리스트에서 삭제

    * 클래스 구상
    1. TaskDataManager : Task Data 들을 관리, localStorage 제어
    2. ListController :  TaskDataManager 와 TaskEventManager 를 제어, List 의 전반적인 제어
    3. TaskEventManager : 하나의 Task 의 추가 체크 삭제 이벤트들을 관리함
*/

class ListController {
    constructor(){
        this.taskDataManager = new TaskDataManager('TaskList');
        this.taskEventManager = new TaskEventManager(this);
    }

    init(){
        this.setButtonEvent();
        this.setStoredData();
        this.setWindowKeyEvent();
    }

    setWindowKeyEvent(){
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                this.addButtonEventHandler();
            }
        }, true);
    }

    setStoredData(){
        const storedData = this.taskDataManager.getStoredData();
        if(storedData.length === 0) return;

        for(const data of storedData){
            this.taskEventManager.addTaskElements(data['contents'], data['date']);
        }
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
        this.resetInput($inputTask, $inputDate);
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
        this.taskDataManager.saveTaskInfo(taskValue, dateValue);
    }

    removeEventDetector(taskValue){
        this.taskDataManager.removeTask(taskValue);
    }
}

class TaskDataManager {
    constructor(storageKey){
        this.taskArray = [];
        this.storageKey = storageKey;
    }

    getStoredData(){
        const taskData = localStorage.getItem(this.storageKey);
        this.taskArray = (taskData !== null ? JSON.parse(taskData) : new Array());
        return this.taskArray;
    }

    setLocalStorage(){
        localStorage.setItem(this.storageKey, JSON.stringify(this.taskArray));
        console.log('setLocalStorage -> ' + localStorage.getItem(this.storageKey));
    }

    saveTaskInfo(taskValue, dateValue){
        this.taskArray.push({contents : taskValue, date : dateValue});
        this.setLocalStorage();
    }

    removeTask(taskValue){
        const index = this.getTaskIndex(taskValue);
        if(index >= 0) this.taskArray.splice(index, 1);
        this.setLocalStorage();
    }

    getTaskIndex(taskValue){
        let index = 0;
        const notExist = -1;
        for(const task of this.taskArray){
            if(task['contents'] === taskValue){ return index; }
            index++;
        }
        return notExist;
    }

    getTaskArray(){
        return this.taskArray;
    }

    clearTaskArray(){
        this.taskArray = [];
        localStorage.clear();
    }
}

// TaskEventHandler 가 나을까?
class TaskEventManager {
    constructor(listController){
        this.$taskList = document.querySelector('#taskList');
        this.listController = listController;
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
        $removeBtn.addEventListener('click', (e) => {this.removeButtonEventHandler(e)});
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

    removeButtonEventHandler(element){
        const $removeBtn = element.currentTarget;
        const $taskLi = $removeBtn.parentNode;
        const taskValue = $taskLi.querySelector('.contents').innerText;
        $taskLi.remove();
        listController.removeEventDetector(taskValue);
    }
}

const listController = new ListController();
listController.init();