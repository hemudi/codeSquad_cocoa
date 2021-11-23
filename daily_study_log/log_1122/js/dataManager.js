export default class DataManager {
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