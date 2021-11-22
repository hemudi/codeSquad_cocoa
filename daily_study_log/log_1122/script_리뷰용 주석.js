/*
    [ TODO LIST Step2 ]
    [X] 2개 이상의 클래스로 구현 => MVC 패턴으로 구현
    [?] 향상된 OOP의 조건 만족 시키기
    [ ] 수정 기능 구현
    [ ] 날짜 별 TODO 보기 기능 구현
*/

/*

  1. Controller : Model 과 View 의 의존성 주입, 데이터 전달, 이벤트 관리
  2. Model : Data 관리, localStorage 관리
  3. View : UI 생성

*/

/* === Model === */
class DataManager {
    constructor(storageKey) {
        this.tempStorage = []; // 임시 데이터 저장소 => 직접 데이터에 접근하는건 위험하고, 무결성 체크가 필요하겠다 싶어서 임시 데이터를 거치게 설계...했지만 체크 기능 구현 안함ㅎㅎ
        this.storageKey = storageKey; // localStorage Key 를 생성자로 받아서 1 Model = 1 LocalStorage 라는 느낌으로 구현
    }

    // Local Storage 에 저장된 데이터를 가져와 tempStorage에 저장하고 tempStorage 를 반환
    getStoredData() {
        const taskData = localStorage.getItem(this.storageKey);
        this.tempStorage = (taskData !== null ? JSON.parse(taskData) : new Array());
        return this.tempStorage;
    }

    // 상태가 변한 tempStorage 를 Local Storage 에 새로 설정
    setLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tempStorage));
    }

    // 새로운 입력 정보를 tempStorage 에 저장하고 Local Storage 변경
    saveTaskData(id, contents, dueDate, checked = false) {
        this.tempStorage.push({
            id: id,
            contents: contents,
            dueDate: dueDate,
            checked: checked
        });
        this.setLocalStorage();
    }

    // id 값을 이용해 tempStorage 의 index 를 구해 해당 요소를 제거하고 Local Storage 변경
    removeTaskData(id) {
        const index = this.getTempStorageIndex(id);
        if (index >= 0) this.tempStorage.splice(index, 1);
        this.setLocalStorage();
    }

    // 데이터 삭제를 위해 id 값을 이용해 tempStorage 의 index 값을 구해서 반환
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

    // id 값을 이용해 찾은 요소의 checked 값을 토글 시킴
    toggleTaskChecked(id) {
        const index = this.getTempStorageIndex(id);
        if (index >= 0) {
            this.tempStorage[index]['checked'] = !this.tempStorage[index]['checked'];
            this.setLocalStorage();
        }
    }

    // tempStorage 를 반환
    getTempStorage() {
        return this.tempStorage;
    }

    // Local Storage 비우는 clear 함수 구현 필요
}

/* ==== View ==== */
class ViewManager {
    constructor() {
        this.$taskList = document.querySelector('#taskList'); // 리스트가 들어갈 ul
        this.eventDetector = function () {}; // 이벤트 발생시 호출할 함수
    }

    // 이벤트 발생시 호출할 함수 설정
    setEventDetector(eventDetector) {
        this.eventDetector = eventDetector;
    }

    // 새로운 데이터를 받아와 li 생성하고 화면에 출력
    createNewLi(taskId, contents, dueDate, checked = false) {
        const $removeBtn = this.createRemoveButton();
        const $checkBox = this.createCheckBox(taskId);
        const $dateLabel = this.createLabel(taskId, 'date', dueDate);
        const $taskLabel = this.createLabel(taskId, 'contents', contents);

        // 체크 된 데이터의 경우
        if (checked) {
            $checkBox.checked = checked;
            this.toggleLabelClass([$taskLabel, $dateLabel]);
        }

        const $taskLi = this.createLi($checkBox, $taskLabel, $dateLabel, $removeBtn);
        document.querySelector('#taskList').appendChild($taskLi);
    }

    /* === li 하위 요소 생성하는 함수들 === */
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

    /* === li 생성 함수 === */
    createLi(...items) {
        const $taskLi = document.createElement('li');
        for (const item of items) {
            $taskLi.append(item);
        }
        return $taskLi;
    }

    // check 버튼에 따라 label 에 줄긋는 함수
    toggleLabelClass(labels) {
        for (const label of labels) {
            label.classList.toggle('label_Checked');
        }
    }

    // li 를 삭제하는 함수
    removeLiElement($li) {
        $li.remove();
    }
}

/* === Controller === */
class Controller {
    constructor(dataManager, viewManager) {
        this.dataManager = dataManager;
        this.viewManager = viewManager;
    }

    // 초기화 함수
    init() {
        this.setAddEvent();   // 데이터 추가 이벤트 설정
        this.setStoredData(); // local Storage 에 저장된 데이터 화면에 출력
        this.viewManager.setEventDetector(this.viewEventDetector.bind(this)); // viewManager 의 eventDetector 설정
    }

    // 이벤트 감지 함수
    viewEventDetector(eventName, event) {
        const currentTarget = event.currentTarget;
        const events = { 
            check: () => { this.checkEventHandler(currentTarget); },
            remove: () => { this.removeEventHandler(currentTarget); }
        }
        events[eventName]();
    }

    // 체크 버튼 클릭 이벤트 핸들러
    checkEventHandler($checkBox) {
        const taskId = $checkBox.getAttribute('id');
        const childNodes = $checkBox.parentNode.childNodes;  // 다른 방법은 없을까
        this.dataManager.toggleTaskChecked(taskId);                         // check 속성 변경할 데이터의 id model 에 전달
        this.viewManager.toggleLabelClass([childNodes[1], childNodes[2]]);  // 줄그을 라벨 view 에 전달 => [1], [2] 이 부분 수정하고 싶은딩...
    }

    // 삭제 버튼 클릭 이벤트 핸들러
    removeEventHandler($removeBtn) {
        const $currentLi = $removeBtn.parentNode;
        const taskId = $currentLi.querySelector('.checkBox').getAttribute('id');
        this.dataManager.removeTaskData(taskId);        // 삭제할 데이터 id 를 model 에 전달
        this.viewManager.removeLiElement($currentLi);   // 삭제할 li view 에 전달
    }

    // Local Storage 에 저장된 데이터 view 에 전달
    setStoredData() {
        const storedData = this.dataManager.getStoredData();
        if (storedData.length === 0) return;

        for (const data of storedData) {
            this.viewManager.createNewLi(data['id'], data['contents'], data['dueDate'], data['checked']);
        }
    }

    // 추가 이벤트 설정
    setAddEvent() {
        this.setEnterKeyAddEvent(); // 엔터키 추가 이벤트
        this.setAddButtonEvent();   // 추가 버튼 클릭 이벤트
    }

    // 엔터키 추가 이벤트
    setEnterKeyAddEvent() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addButtonEventHandler();
            }
        }, true);
    }

    // 추가 버튼 클릭 이벤트
    setAddButtonEvent() {
        const $addButton = document.querySelector('#addBtn');
        $addButton.addEventListener('click', (e) => {
            this.addButtonEventHandler()
        });
    }

    // 추가 버튼 클릭 이벤트 핸들러
    addButtonEventHandler() {
        const $inputTask = document.querySelector('#taskInput');
        const $inputDate = document.querySelector('#dateInput');
        const contents = $inputTask.value;
        const dueDate = $inputDate.value;
        const taskId = this.getTaskId();    // 현재 시간을 이용한 id 생성

        // 입력 폼이 비어있는 예외처리
        if (this.isFormEmpty(contents, dueDate)) return;

        this.resetInputForm($inputTask, $inputDate);          // 입력 폼 초기화
        this.addTaskProcess(taskId, contents, dueDate);   // 입력 데이터 처리 함수 호출 
    }

    // 현재 시간을 이용한 id 생성 함수
    getTaskId() {
        const timeId = new Date();
        return timeId.getTime();
    }

    // 빈 입력폼 예외처리
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

    // 입력 폼 초기화
    resetInputForm($inputTask, $inputDate) {
        $inputTask.value = '';
        $inputDate.value = '';
    }

    // 데이터 추가 처리 함수
    addTaskProcess(taskId, contents, dueDate) {
        this.viewManager.createNewLi(taskId, contents, dueDate);    // viewManager 의 createNewLi 호출 => 화면에 새로운 li 생성해 출력
        this.dataManager.saveTaskData(taskId, contents, dueDate);   // dataManager 의 saveTaskData 호출 => localStorage 에 저장
    }
}

/* === 실행 부분 === */
const localStorageKey = 'ToDoKey'
const viewManager = new ViewManager();
const dataManager = new DataManager(localStorageKey);
const toDoListController = new Controller(dataManager, viewManager);

toDoListController.init();
