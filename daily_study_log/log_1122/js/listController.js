export default class ListController {
    constructor(dataManager, viewManager){
        this.dataManager = dataManager;
        this.viewManager = viewManager;
    }

    init(){
       this.viewManager.setDetector(this.viewEventDetector.bind(this));
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
                this.addEventHandler();
            }
        }, true);
    }

    setAddButtonEvent(){
        const $addButton = document.querySelector('#addBtn');
        $addButton.addEventListener('click', (e) => {this.addEventHandler()});
    }

    addEventHandler(){
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