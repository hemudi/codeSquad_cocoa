function menuSetup() {
    let showDelay = 300;
    let hideDelay = 800;

    let menuEnterTimer;
    let menuLeaveTimer;

    let allMenuItems = document.querySelectorAll('#nav .menu-item');

    for (let i = 0; i < allMenuItems.length; i++) {
        allMenuItems[i].addEventListener('mouseenter', function(){
            let thisItem = this;
            
            clearTimeout(menuLeaveTimer);

            for(let j=0; j < allMenuItems.length; j++){
                allMenuItems[j].classList.remove('active');
            }

            menuEnterTimer = setTimeout(function(){
                thisItem.classList.add('active');
            }, showDelay);
        });

        allMenuItems[i].addEventListener('mouseleave', function(){
            let thisItem = this;

            clearTimeout(menuEnterTimer);

            menuLeaveTimer = setTimeout(function(){
                thisItem.classList.remove('active');
            }, hideDelay);
        })
    }
}

document.addEventListener('DOMContentLoaded', menuSetup);