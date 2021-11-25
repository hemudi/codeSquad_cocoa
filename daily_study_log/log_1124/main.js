/*
    [ ] 리스트 1초 딜레이 드롭다운
    - 리스트 창에 마우스를 대면 mouseenter 이벤트 발생
       - mouseenter 이벤트 콜백에서 리스트의 하위 요소들의 classList 를 1초 후 변경하는 timer 생성
    - 리스트 창에서 마우스를 떼면 mouseleave 이벤트 발생
       - 1초가 되기 전에 떼는 경우 대비 mouseenter timer 를 clearTimeout 으로 삭제
       - 리스트 하위 욧들의 classList 를 변경하는 timer 생성
          => 이 타이머도 mouseenter 이벤트 할때 삭제해줘야 하나?...

    [ ] 마우스 움직임 추적 이벤트
    - 하위 요소의 이벤트 발생 횟수는 객체로 만들어서 관리?
    - mouseenter 이벤트 내에서 생성하는 timer 내에서 mousemove 이벤트 생성
        - mousemove 이벤트 콜백에서 0.5 초 후 해당 요소의 횟수를 + 1 하는 식으로...
    - 이벤트 쓰로틀링?

*/

const ENTER_DELAY = 1000;
const MOVE_DELAY = 500;

function getMenu() {
    return document.querySelector('.menu');
}

function setMenuItemEvent() {
    let $menuItem = getMenu();
    let enterTimer = null;
    let leaveTimer = null;

    $menuItem.addEventListener('mouseenter', function () {
        if (leaveTimer !== null) {
            clearTimeout(leaveTimer)
        };

        enterTimer = setTimeout(function () {
            $menuItem.classList.add('active');
            // 여기서 하위 요소들에게 mousemove 이벤트 달아줘야?...하나?
        }, ENTER_DELAY);
    });

    $menuItem.addEventListener('mouseleave', function () {
        if (enterTimer !== null) {
            clearTimeout(enterTimer);

            leaveTimer = setTimeout(function () {
                $menuItem.classList.remove('active');
            }, ENTER_DELAY);

        }
    });
}

/*----실행부분----*/
setMenuItemEvent();
