// 숫자 타입으로만 구성된 요소를 뽑아 배열 만들기
// output => width, height, hOffset, vOffset, size, hOffset, vOffset

// 

const data = {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": { 
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    },
    "debug2" : "string"
}

function travelObject(object, result){
    let keysOfNumValue = [];

    for(let key in object){
        let value = object[key];

        if(typeof(value) === 'number'){                     // 값이 숫자면 넣고 객체면 다시 순회
            keysOfNumValue.push(key);   
        }
        else if(typeof(value) == 'object'){
            keysOfNumValue.push(travelObject(value));
        }
    }
    return keysOfNumValue;
}

console.log(travelObject(data));

// 