/*
    [ TODO LIST Step2 ]
    [X] 2개 이상의 클래스로 구현 => MVC 패턴으로 구현
    [?] 향상된 OOP의 조건 만족 시키기
    [ ] 수정 기능 구현
    [ ] 날짜 별 TODO 보기 기능 구현
*/

/*
    [ Class ]
    1. DataManager : Model
    2. ViewManager : View
    3. Controller : Controller
    4. TaskLiElement : 하나의 일정 Li 객체 

    [추가 이벤트 과정]
    1. 새로운 일정이 입력되면 Controller 가 해당 정보를 TaskLiElement 객체로 만들어서 View 에게 넘겨줌
    2. View 가 그걸 화면에 그림

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

/* === 실행 부분 === */
const localStorageKey = 'ToDoKey'
const viewManager = new ViewManager();
const dataManager = new DataManager(localStorageKey);
const toDoListController = new Controller(dataManager, viewManager);

toDoListController.init();
