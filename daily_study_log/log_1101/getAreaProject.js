function getArea(){
    const inputArguments = Array.from(arguments);

    if(isValidArguments(inputArguments) == false){
        console.log('※ 주의 : 매개변수를 확인해주세요!');
        return;
    }

    console.log('getArea(' + arguments[0] + ') 계산 결과 : ' +  calculator(inputArguments[0], inputArguments.slice(1)));
}

// 유효한 매개변수인지 체크
function isValidArguments(arg){
    if(arg.length < 2){
        console.log('기본 매개변수 입력 제대로 안됨');
        return false;
    }

    const shape = arg[0];
    const argCount = arg.length - 1;
    const sizeArray = arg.slice(1);

    if(isValidShape(shape, argCount) == false){
        // 유효한 도형과 입력 값이 아님
        console.log('유효한 도형과 입력 값이 아님');
        return false;
    }

    if(isValidSize(shape, sizeArray) == false){
        // 유효한 도형의 크기가 아님
        // 음수거나 숫자가 아니거나
        console.log('유효한 도형의 크기가 아님');
        return false;
    }

    return true;
}

const shapeArgCount = {
    circle: [1, 2],
    rect : [2],
    trapezoid : [3]
};

// 유효한 도형인지 체크
function isValidShape(shape, argCount){

    if(shapeArgCount[shape] == undefined){
        return false;
    }

    return shapeArgCount[shape].includes(argCount);
}

// 유효한 사이즈인지
function isValidSize(shape, sizeArray){
    for(let value of sizeArray){
        if(isNaN(value)){
            console.log('isNaN');
            return false;
        }

        if(value < 0){
            console.log('value < 0');
            return false;
        }
    }

    if(shape == 'circle'){
        return isValidRadiusOfCircle(sizeArray)
    }

    return true;
}

// 유효한 원인지
function isValidRadiusOfCircle(radiusArray){
    if(radiusArray.length == 1) {
        return true;
    }

    if(radiusArray[0] > radiusArray[1]) {
        return false;
    }

    return true;
}

function calculator(shape, values){
    var getResult = {
        circle : function(){ return getCircleArea(values) },
        rect : function(){ return getRectArea(values[0], values[1])},
        trapezoid : function(){ return getTrapezoidArea(values[0], values[1], values[2])}
    };

    return getResult[shape]();    
}

function getCircleArea(radiusInfo){
    var result = 0;
    var radius = radiusInfo[0];
    var maxRadius = getMaxRadius(radiusInfo);

    do{
        result += calcCircleArea(radius);
    } while(radius++ < maxRadius);

    return result;
}

function getMaxRadius(radiusArray){
    if(radiusArray.length == 1) return -1;
    return radiusArray[1];
}

function calcCircleArea(radius){
    return radius*radius*Math.PI;
}

function getRectArea(width, height){
    return width*height;
}

function getTrapezoidArea(top, bottom, height){
    return (top+bottom) * height / 2;
}

/* 테스트 */
getArea('circle', 10);
getArea('rect', 10, 15);
getArea('trapezoid', 10, 15, 12);
getArea('circle', 1, 3);
