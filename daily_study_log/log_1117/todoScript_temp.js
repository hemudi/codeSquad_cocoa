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
    2. ListController : TODO 리스트의 이벤트들을 제어
    3. TaskCreator : Task li 생성...? => 굳이? 싶은가?
*/

// 할일 데이터만 관리
// localStorage 를 사용한다면 여기서...?
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

// 리스트 이벤트 관리
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

        this.formClear($inputTask, $inputDate);
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

    formClear($inputTask, $inputDate){
        $inputTask.value = '';
        $inputDate.value = '';
    }

    addTake(taskValue, dateValue){
        this.taskDataManager.addTake(taskValue, dateValue);
        const $taskLi = this.taskCreator.createTaskLi(taskValue, dateValue);
        // 생성한 taskLi 를 ul 에 붙이기 => appendChild()? 사용하나?
    }

    /* 문제 */
        // taskCreator 에서 element 를 만들면 거기서 체크박스랑 버튼 event 도 붙여야함
        // 그러면 ListController 에서 event 함수를 만들어서 taskCreator 한테 전달해서 설정하게 해야하나?
        /*
            taskCreator.setEvent(checkEvent, deleteEvent);

            setEvent(checkEvent, deleteEvent){
                checkBtn.addEventListener('click', checkEvent);
                deleteBtn.addEventListener('click', deleteEvent);
            }
            이렇게 해도 이벤트가 제대로 실행이 되나??
        */
        // 만약 이렇게 하면 taskCreator 에서 생성하려는 element를 constructor 에서 만들어놔야할듯
        // createTaskLi 랑 setEvent 에서 다 접근할 수 있게...?
        // 아니면 그냥 taskCreator 에서 이벤트를 설정하면...근데 그러면 클래스를 데이터+이벤트+생성으로 나눈 의미가 있을까?

    removeTask(taskValue){
        this.taskDataManager.removeTask(taskValue);
    }

    checkButtonEvent(){
        // 여기서 check 박스 이벤트를 만든다치면 글자 색 변경하기 위해 label 에는 어떻게 접근하지?
        // label 생성할때 만든 id 값으로 접근해서?
    }

    deleteButtonEvent(){

    }
}

// Task Element 생성
class TaskCreator{
    constructor() {
    }

    // 함수 쪼개야하나?
    createTaskLi(taskValue, dateValue){
        /* 1. 생성한 Element 들 설정하고 */
        const $checkBox = document.createElement('input');
        const $contents = document.createElement('label');
        const $dueDate = document.createElement('label');
        const $removeBtn = document.createElement('button');

        /* 2. li 만들어서 생성한 Element 들 붙이고 */
        const $taskLi = document.createElement('li');
        $taskLi.append()

        /* 3. li 반환? */
    }
}
