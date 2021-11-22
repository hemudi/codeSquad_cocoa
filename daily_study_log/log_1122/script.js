/*
    * TODO LIST_2
    [ ] 2개 이상의 클래스로 구현
    [ ] 향상된 OOP의 조건 만족 시키기
    [ ] 수정 기능 구현
    [ ] 날짜 별 TODO 보기 기능 구현
*/

/*

  1. Controller : Model 과 View 의 제어, 데이터 전달, 추가 버튼 이벤트 실행
  2. Model : Data 관리, localStorage 관리
  3. View : UI 생성, UI 컨트롤 이벤트들을 관리

  [-] 추가 버튼 클릭 이벤트
    1. 추가 버튼 클릭 이벤트가 발생
    2. Controller 는 입력폼과 마감일의 데이터를 수집
    3. 각 데이터를 Model 과 View 에게 넘겨줌
    4. Model 에서는 데이터를 local Storage 에 저장
    5. View 에서는 해당 데이터로 리스트 아이템을 생성해서 화면에 출력

  [-] 삭제 버튼, 체크박스 클릭 이벤트
    1. 클릭 이벤트가 발생
    2. Controller 는 해당 이벤트가 발생한 요소의 상위 요소의 정보와 데이터를 View 와 Model 에 넘김
    3. View 에서는 해당 요소를 삭제 후 Controller 로 부터 받은 detector 함수에 이벤트 이름과 데이터를 넘김
    4. detector 함수를 통해 이벤트 정보를 받은 Controller 는 이벤트에 따라 알맞은 Model 의 함수를 호출
    4. Model 에서 해당 데이터를 처리

*/

class DataManager {
    constructor(storageKey){
        this.tempStorage = [];
        this.storageKey = storageKey;
    }

    getStoredData(){
        const taskData = localStorage.getItem(this.storageKey);
        this.tempStorage = (taskData !== null ? JSON.parse(taskData) : new Array());
        return this.tempStorage;
    }

    setLocalStorage(){
        localStorage.setItem(this.storageKey, JSON.stringify(this.tempStorage));
    }

    saveTaskData(id, contents, dueDate, checked = false){
        this.tempStorage.push({
            id : id,
            contents : contents,
            dueDate : dueDate,
            checked : checked
        });
        this.setLocalStorage();
    }

    getTempStorageIndex(id){
        const notExists = -1;
        let index = 0;
        let getId = 0;
        for(const task of this.tempStorage){
            getId = task['id'];
            if(getId === +id) { return index };
            index++;
        }
        return notExists;
    }

    removeTaskData(id){
        const index = this.getTempStorageIndex(id);
        if(index >= 0) this.tempStorage.splice(index, 1);
        this.setLocalStorage();
    }

    toggleTaskChecked(id){
        const index = this.getTempStorageIndex(id);
        if(index >= 0){
            this.tempStorage[index]['checked'] = !this.tempStorage[index]['checked'];
            this.setLocalStorage();
        }
    }
    
    getTempStorage(){
        return this.tempStorage;
    }
}

class ViewManager {
    constructor(){
        this.$taskList = document.querySelector('#taskList');
        this.eventDetector = function(){};
    }

    setDetector(eventDetector){
        this.eventDetector = eventDetector;
    }

    addTask(taskId, contents, dueDate, checked = false){
        const $removeBtn = this.createRemoveButton();
        const $checkBox = this.createCheckBox(taskId);
        const $dateLabel = this.createLabel(taskId, 'date', dueDate);
        const $taskLabel = this.createLabel(taskId, 'contents', contents);

        if(checked){
            $checkBox.checked = checked;
            this.toggleLabelClass([$taskLabel, $dateLabel]);
        }

        const $taskLi = this.createLi($checkBox, $taskLabel, $dateLabel, $removeBtn);
        document.querySelector('#taskList').appendChild($taskLi);
    }

    createLabel(taskId, className, value){
        const $label = document.createElement('label');
        $label.classList.add(className);
        $label.innerText = value;
        $label.htmlFor = taskId;
        return $label;
    }

    // need test
    toggleLabelClass(labels){
        for(const label of labels){ label.classList.toggle('label_Checked'); }
    }

    createLi(...items){
        const $taskLi = document.createElement('li');
        for(const item of items){ $taskLi.append(item); }
        return $taskLi;
    }

    createRemoveButton(){
        const $removeBtn = document.createElement('button');
        $removeBtn.classList.add('removeBtn');
        $removeBtn.innerText = '×';
        $removeBtn.addEventListener('click', (e) => {this.removeButtonEventHandler(e)});
        return $removeBtn;
    }

    createCheckBox(taskId){
        const $checkBox = document.createElement('input');
        $checkBox.type = 'checkbox';
        $checkBox.id = taskId;
        $checkBox.classList.add('checkBox');
        $checkBox.addEventListener('click', (e) => {this.checkBoxEventHandler(e)})
        return $checkBox;
    }

    checkBoxEventHandler(e){
        const $checkBox = e.currentTarget;
        const taskId = $checkBox.getAttribute('id');
        const childNodes = $checkBox.parentNode.childNodes;
        this.toggleLabelClass([childNodes[1], childNodes[2]]);
        this.eventDetector('check', taskId);
    }

    removeButtonEventHandler(element){
        const $removeBtn = element.currentTarget;
        const $taskLi = $removeBtn.parentNode;
        const taskId = $taskLi.querySelector('.checkBox').getAttribute('id');
        this.eventDetector('remove', taskId);
        $taskLi.remove();
    }
}

class Controller {
    constructor(dataManager, viewManager){
        this.dataManager = dataManager;
        this.viewManager = viewManager;
    }

    init(){
       viewManager.setDetector(this.viewEventDetector.bind(this));
       this.setStoredData();
       this.setAddEvent();
    }

    viewEventDetector(eventName, taskId){
        const events = {
            remove : () => {this.dataManager.removeTaskData(taskId)},
            check : () => {this.dataManager.toggleTaskChecked(taskId)}
        }
        events[eventName]();
    }

    setStoredData(){
        const storedData = this.dataManager.getStoredData();
        if(storedData.length === 0) return;

        for(const data of storedData){
            this.viewManager.addTask(data['id'], data['contents'], data['dueDate'], data['checked']);
        }
    }

    setAddEvent(){
       this.setEnterKeyAddEvent();
       this.setAddButtonEvent();
    }

    setEnterKeyAddEvent(){
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                this.addButtonEventHandler();
            }
        }, true);
    }

    setAddButtonEvent(){
        const $addButton = document.querySelector('#addBtn');
        $addButton.addEventListener('click', (e) => {this.addButtonEventHandler()});
    }

    addButtonEventHandler(){
        const $inputTask = document.querySelector('#taskInput');
        const $inputDate = document.querySelector('#dateInput');
        const contents = $inputTask.value;
        const dueDate = $inputDate.value;
        const taskId = this.getTaskId();

        if(this.isFormEmpty(contents, dueDate)) return;
        this.resetInput($inputTask, $inputDate);
        this.addTask(taskId, contents, dueDate);
    }

    getTaskId(){
        const timeId = new Date();
        return timeId.getTime();
    }

    isFormEmpty(contents, dueDate){
        if(contents === ""){
            alert("할일을 입력해주세요!");
            return true;
        }

        if(dueDate === ""){
            alert("마감 날짜를 선택해주세요!");
            return true;
        }

        return false;
    }

    resetInput($inputTask, $inputDate){
        $inputTask.value = '';
        $inputDate.value = '';
    }

    addTask(taskId, contents, dueDate){
        this.viewManager.addTask(taskId, contents, dueDate);
        this.dataManager.saveTaskData(taskId, contents, dueDate);
    }
}

const localStorageKey = 'ToDoKey'
const dataManager = new DataManager(localStorageKey);
const viewManager = new ViewManager();
const controller = new Controller(dataManager, viewManager);

controller.init();
