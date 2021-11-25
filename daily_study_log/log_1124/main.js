const ENTER_DELAY = 1000;
const MOVE_DELAY = 500;

function setMenuEvent(){
    const $menuItem = document.querySelector('.menu');
    let enterTimer = null;
    let leaveTimer = null;

    $menuItem.addEventListener('mouseenter', function () {
        if (leaveTimer !== null) {
            clearTimeout(leaveTimer)
        };

        enterTimer = setTimeout(function () {
            $menuItem.classList.add('active');
            setItemEvent();
        }, ENTER_DELAY);
    });

    $menuItem.addEventListener('mouseleave', function () {
        if (enterTimer !== null) {
            clearTimeout(enterTimer);
        }
        leaveTimer = setTimeout(function () {
            $menuItem.classList.remove('active');
        }, ENTER_DELAY);

    });
}

// 리팩토링 필요
function setItemEvent(){
    const items = document.querySelectorAll('#item');
    const viewMaker = new ViewMaker();
    const eventCounter = new EventCounter();
    let moveTimer = null;

    for(const item of items){
        item.addEventListener('mousemove', function () {
            if(!moveTimer){
                moveTimer = setTimeout(function () {
                    moveTimer = null;
                    eventCounter.plusCount(item.innerText);
                    viewMaker.render(eventCounter.getEventCount());
                }, MOVE_DELAY);
            }
        })
    }
}

class ViewMaker {
    constructor(){
        this.$countDiv = document.querySelector("#count");
    }

    render(countObj){
        let $itemLabel = null;
        for(const key of Object.keys(countObj)){
            $itemLabel = document.querySelector("#"+key);

            if($itemLabel === null){
                this.$countDiv.append(this.createNewLi(key, countObj[key]));
            } else {
                $itemLabel.innerText = `${key} : ${countObj[key]}`;
                console.log(`innerText => ${key} : ${countObj[key]}`);
            }
        }
    }

    createNewLi(name, count){
        const $label = document.createElement('li');
        $label.id = name;
        $label.innerText = `${name} : ${count}`;
        console.log(`createNewLi => ${name} : ${count}`);
        return $label;
    }
}

class EventCounter {
    constructor(){
        this.eventCount = {};
    }

    plusCount(itemName){
        if(itemName in this.eventCount){
            this.eventCount[itemName]++;
            return;
        }

        this.eventCount[itemName] = 1;
    }

    getEventCount(){
        return this.eventCount;
    }

    clearEventCount(){
        this.eventCount = {};
    }
}

/*----실행부분----*/
setMenuEvent();