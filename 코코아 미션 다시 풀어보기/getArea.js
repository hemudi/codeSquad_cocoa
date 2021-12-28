// 첫번째 미션 : 다각형의 넓이 구하기
function getArea(shape, ...params) {
    if(isInValidParams(shape, params)) return 'Error : Invalid parameter';
    const result = getAreaOf(shape, params);
    executionSequence.push(`${shape}(${result})`);
    return result;
}

function isInValidParams(shape, params) {
    const count = params.length;
    const shapeArgCount = {
        circle: [1, 2],
        rect : [2],
        trapezoid : [3]
    };

    if(!shapeArgCount[shape]) return true;
    if(!shapeArgCount[shape].includes(count)) return true;
    if(!checkParamsValue(params)) return true;
    if(shape === 'circle' && count === 2 && params[0] > params[1]) return true;
    return false;
}

function checkParamsValue(params) {
    for(const param of params){
        if(param <= 0) return false;
        if(isNaN(param)) return false;
    }
    return true;
}

function getAreaOf(shape, params){
    const calcArea = {
        circle : () => getCircleArea(params),
        rect : () => getRectArea(params),
        trapezoid : () => getTrapArea(params)
    }
    return calcArea[shape]();
}

function getCircleArea(params){
    const radius = params[0];
    const maxRadius = params[1] || radius;
    const calculate = (r, max) => { 
        if(max === r) return r * r * Math.PI;
        return (r * r * Math.PI) + calculate(r + 1, max);
    }
    return calculate(radius, maxRadius).toFixed(2);
}

function getRectArea(params) {
    const [height, weight] = params;
    return height * weight;
}

function getTrapArea(params) {
    const [top, bottom, height] = params;
    return (top + bottom) * height / 2;
}

let executionSequence = [];
function printExecutionSequence() {
    const result = '계산수행순서 : ' + executionSequence.join(', ');
    executionSequence = [];
    return result;
}

/* 테스트 */
console.log(getArea('circle', 10));
console.log(getArea('rect', 10, 15));
console.log(getArea('trapezoid', 10, 15, 12));
console.log(getArea('circle', 1, 3));
console.log(printExecutionSequence());

/* 입력값 테스트 */
console.log(getArea('circle'));
console.log(getArea('circle', 3, 3, 2));
console.log(getArea('circle', 'circle'));
console.log(getArea('triangle', 3, 1));
console.log(getArea('rect', 10));
console.log(getArea('rect', -1, 19));
console.log(getArea('trapezoid', 10, 10, 10, 10));
console.log(getArea(3, 3));