/*
    [ TODO LIST Step2 ]
    [X] 2개 이상의 클래스로 구현 => MVC 패턴으로 구현
    [?] 향상된 OOP의 조건 만족 시키기
    [ ] 수정 기능 구현
    [ ] 날짜 별 TODO 보기 기능 구현
*/

import ViewManager from './viewManager.js';
import DataManager from './dataManager.js';
import ListController from './listController.js';

/* === 실행 부분 === */
const localStorageKey = 'ToDoKey'
const viewManager = new ViewManager();
const dataManager = new DataManager(localStorageKey);
const toDoListController = new ListController(dataManager, viewManager);

toDoListController.init();
