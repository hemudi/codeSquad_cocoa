/*
    [ TODO LIST Step2 ]
    [X] 2개 이상의 클래스로 구현 => MVC 패턴으로 구현
    [?] 향상된 OOP의 조건 만족 시키기
    [ ] 수정 기능 구현
    [ ] 날짜 별 TODO 보기 기능 구현
*/

class DataManager {
    constructor(storageKey) {
        this.tempStorage = [];
        this.storageKey = storageKey; 
    }

    getStoredData() {
        const taskData = localStorage.getItem(this.storageKey);
        this.tempStorage = (taskData !== null ? JSON.parse(taskData) : new Array());
        return this.tempStorage;
    }

    setLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tempStorage));
    }

    saveTaskData(id, contents, dueDate, checked = false) {
        this.tempStorage.push({
            id: id,
            contents: contents,
            dueDate: dueDate,
            checked: checked
        });
        this.setLocalStorage();
    }

    removeTaskData(id) {
        const index = this.getTempStorageIndex(id);
        if (index >= 0) this.tempStorage.splice(index, 1);
        this.setLocalStorage();
    }

    getTempStorageIndex(id) {
        const notExists = -1;
        let index = 0;
        let getId = 0;
        for (const task of this.tempStorage) {
            getId = task['id'];
            if (getId === +id) {
                return index
            };
            index++;
        }
        return notExists;
    }

    toggleTaskChecked(id) {
        const index = this.getTempStorageIndex(id);
        if (index >= 0) {
            this.tempStorage[index]['checked'] = !this.tempStorage[index]['checked'];
            this.setLocalStorage();
        }
    }

    getTempStorage() {
        return this.tempStorage;
    }


}

class ViewManager {
    constructor() {
        this.$taskList = document.querySelector('#taskList'); 
        this.eventDetector = function () {};
    }

    setEventDetector(eventDetector) {
        this.eventDetector = eventDetector;
    }

    createNewLi(taskId, contents, dueDate, checked = false) {
        const $removeBtn = this.createRemoveButton();
        const $checkBox = this.createCheckBox(taskId);
        const $dateLabel = this.createLabel(taskId, 'date', dueDate);
        const $taskLabel = this.createLabel(taskId, 'contents', contents);

        if (checked) {
            $checkBox.checked = checked;
            this.toggleLabelClass([$taskLabel, $dateLabel]);
        }

        const $taskLi = this.createLi($checkBox, $taskLabel, $dateLabel, $removeBtn);
        document.querySelector('#taskList').appendChild($taskLi);
    }

    createLabel(taskId, className, value) {
        const $label = document.createElement('label');
        $label.classList.add(className);
        $label.innerText = value;
        $label.htmlFor = taskId;
        return $label;
    }

    createRemoveButton() {
        const $removeBtn = document.createElement('button');
        $removeBtn.classList.add('removeBtn');
        $removeBtn.innerText = '×';
        $removeBtn.addEventListener('click', (e) => {
            this.eventDetector('remove', e)
        });
        return $removeBtn;
    }

    createCheckBox(taskId) {
        const $checkBox = document.createElement('input');
        $checkBox.type = 'checkbox';
        $checkBox.id = taskId;
        $checkBox.classList.add('checkBox');
        $checkBox.addEventListener('click', (e) => {
            this.eventDetector('check', e)
        });
        return $checkBox;
    }

    createLi(...items) {
        const $taskLi = document.createElement('li');
        for (const item of items) {
            $taskLi.append(item);
        }
        return $taskLi;
    }

    toggleLabelClass(labels) {
        for (const label of labels) {
            label.classList.toggle('label_Checked');
        }
    }

    removeLiElement($li) {
        $li.remove();
    }
}

class Controller {
    constructor(dataManager, viewManager) {
        this.dataManager = dataManager;
        this.viewManager = viewManager;
    }

    init() {
        this.setAddEvent();  
        this.setStoredData(); 
        this.viewManager.setEventDetector(this.viewEventDetector.bind(this)); 
    }

    viewEventDetector(eventName, event) {
        const currentTarget = event.currentTarget;
        const events = { 
            check: () => { this.checkEventHandler(currentTarget); },
            remove: () => { this.removeEventHandler(currentTarget); }
        }
        events[eventName]();
    }

    checkEventHandler($checkBox) {
        const taskId = $checkBox.getAttribute('id');
        const childNodes = $checkBox.parentNode.childNodes; 
        this.dataManager.toggleTaskChecked(taskId);                         
        this.viewManager.toggleLabelClass([childNodes[1], childNodes[2]]);  
    }

    removeEventHandler($removeBtn) {
        const $currentLi = $removeBtn.parentNode;
        const taskId = $currentLi.querySelector('.checkBox').getAttribute('id');
        this.dataManager.removeTaskData(taskId);        
        this.viewManager.removeLiElement($currentLi);  
    }

    setStoredData() {
        const storedData = this.dataManager.getStoredData();
        if (storedData.length === 0) return;

        for (const data of storedData) {
            this.viewManager.createNewLi(data['id'], data['contents'], data['dueDate'], data['checked']);
        }
    }

    setAddEvent() {
        this.setEnterKeyAddEvent(); 
        this.setAddButtonEvent();  
    }

    setEnterKeyAddEvent() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addButtonEventHandler();
            }
        }, true);
    }

    setAddButtonEvent() {
        const $addButton = document.querySelector('#addBtn');
        $addButton.addEventListener('click', (e) => {
            this.addButtonEventHandler()
        });
    }

    addButtonEventHandler() {
        const $inputTask = document.querySelector('#taskInput');
        const $inputDate = document.querySelector('#dateInput');
        const contents = $inputTask.value;
        const dueDate = $inputDate.value;
        const taskId = this.getTaskId();

        if (this.isFormEmpty(contents, dueDate)) return;

        this.resetInputForm($inputTask, $inputDate);          
        this.addTaskProcess(taskId, contents, dueDate);   
    }

    getTaskId() {
        const timeId = new Date();
        return timeId.getTime();
    }

    isFormEmpty(contents, dueDate) {
        if (contents === "") {
            alert("할일을 입력해주세요!");
            return true;
        }

        if (dueDate === "") {
            alert("마감 날짜를 선택해주세요!");
            return true;
        }

        return false;
    }

    resetInputForm($inputTask, $inputDate) {
        $inputTask.value = '';
        $inputDate.value = '';
    }

    addTaskProcess(taskId, contents, dueDate) {
        this.viewManager.createNewLi(taskId, contents, dueDate);
        this.dataManager.saveTaskData(taskId, contents, dueDate);
    }
}

/* === 실행 부분 === */
const localStorageKey = 'ToDoKey'
const viewManager = new ViewManager();
const dataManager = new DataManager(localStorageKey);
const toDoListController = new Controller(dataManager, viewManager);

toDoListController.init();
