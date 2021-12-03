export default class ViewManager {
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