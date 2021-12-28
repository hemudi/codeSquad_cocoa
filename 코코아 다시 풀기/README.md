# __🍪 코코아 미션 다시 풀어보기__
> ### 프로그래머스 마스터즈 코스 시작 전 몇몇개의 미션을 다시 풀어보기로 했다.
---

## __✏️ WEEK 1 - 1__

## __✅다각형의 넓이 구하기__ : [이전 풀이(1101)](log_1101/../../daily_study_log/log_1101/getAreaProject.js) ➞ [새로운 풀이(1228)](1101_getArea.js)
### 1. 가변 인자를 대응하기 위해 arguments 를 사용했던 이전과 달리 rest parameter 를 사용해 구현했다.
```js
// 이전 풀이
function getArea(){
    const inputArguments = Array.from(arguments);
    ...
    const shape = inputArguments[0];
    const values = inputArguments.slice(1);
}
// 새로운 풀이
function getArea(shape, ...params) {
    ...
    const result = getAreaOf(shape, params);
    ...
    return result;
}
```
</br>

### 2. 유효한 값을 체크하기 위해 4개의 함수를 사용했던 이전과 달리 2개의 함수로 줄였다.
```js
// 이전 풀이
function isValidArguments(arg){} // -> call isValidShape(), isValidSize()
function isValidShape(shape, argCount){}
function isValidSize(shape, sizeArray){} // -> call isValidRadiusOfCircle()
function isValidRadiusOfCircle(radiusArray){}

// 새로운 풀이
function isInValidParams(shape, params) {
    const count = params.length;
    const shapeArgCount = {
        circle: [1, 2],
        rect : [2],
        trapezoid : [3]
    };

    // 근데 이 부분이 가독성이 좀 떨어지나 싶어서 고민...
    if(!shapeArgCount[shape]) return true;
    if(!shapeArgCount[shape].includes(count)) return true;
    if(!checkParamsValue(params)) return true;
    // 이것도 함수로 따로 뺄까 고민...
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
```
</br>

### 3. 배열 디스트럭처링을 사용해봄.
```js
// 이전 풀이
var getResult = {
    circle : function(){ return getCircleArea(values) },
    rect : function(){ return getRectArea(values[0], values[1])},
    trapezoid : function(){ return getTrapezoidArea(values[0], values[1], values[2])}
};
function calcCircleArea(radius){}
function getRectArea(width, height){}
function getTrapezoidArea(top, bottom, height){}

// 새로운 풀이
const calcArea = {
    circle : () => getCircleArea(params),
    rect : () => getRectArea(params),
    trapezoid : () => getTrapArea(params)
}

function getRectArea(params) {
    const [height, weight] = params;
    return height * weight;
}

function getTrapArea(params) {
    const [top, bottom, height] = params;
    return (top + bottom) * height / 2;
}
```

### 사실 원래는 아래 같은 느낌으로 해보고 싶었다.

```js
function getTrapArea([top, bottom, height]){
    return (top + bottom) * height / 2;
}
```

#### 근데 이렇게 했더니 오류가 난다...이런 방식으로는 사용할 수 없는 것 같다. ( ´. _.`)....
#### 어쩌나 저쩌나 이런 식으로 구현하면 깔끔하게 보이긴해도 함수의 독립성이 낮아지는거 같으니까 함수 실행 전 분리해서 매개변수로 주는 이전 방식이 더 나은거 같다....

</br>

### 4. 기존에는 do while 문으로 구현했던 원의 넓이 구하는 기능을 재귀 방식으로 구현해봤다.
```js
// 이전 풀이
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

// 새로운 풀이
function getCircleArea(params){
    const radius = params[0];
    const maxRadius = params[1] || radius;
    const calculate = (r, max) => { 
        if(max === r) return calcCircleArea(r);
        return calcCircleArea(r) + calculate(r + 1, max);
    }
    return calculate(radius, maxRadius).toFixed(2);
}
```
#### calculate 라는 재귀 Helper 함수를 구현해서 현재의 반지름이 max 반지름과 같아질때까지 반복해서 호출하는 방식으로 구현했다.
#### 또한 기존에 getMaxRadius 라는 별도 함수를 통해 초기화 시켰던 max 반지름 값을 || 연산자를 사용해서 초기화했다.

---

## __✏️ WEEK 1 - 2__
## __✅ 배열 만들기__ : [이전풀이(1103)](log_1103/../../daily_study_log/log_1103/arrayHandling_4_createArray.js) ➞ [새로운풀이(1103)](1103_createArray.js)

### 1. 예시 데이터를 별도 파일로 분리해서 module 방식으로 불러와 사용함
```js
export default data;
import data from './data/exampleData.js';
```

### 2. 재귀 방식을 수정함.
```js
// 이전 풀이
function travelObject(object){
    let keysOfNumValue = [];

    for(let key in object){
        let value = object[key];

        if(typeof(value) === 'number'){
            keysOfNumValue.push(key);   
        }
        else if(typeof(value) === 'object'){
            keysOfNumValue.push(travelObject(value));
        }
    }
    return keysOfNumValue;
}

// 새로운 풀이
function getNumTypeValues(data) {
    const result = [];
    const search = (key, value) => {
        if(typeof value !== 'object'){
            (typeof value === 'number') ? result.push(key) : null;
            return;
        }

        for(const key of Object.keys(value)){
            search(key, value[key]);
        }
    }
    search(null, data);
    return result;
}
```
#### travelObject 전체를 재귀로 호출했던 기존과 다르게 search 라는 helper 함수를 구현해 해당 함수를 재귀적으로 호출하도록 구현함
#### 근데 비교해보니 굳이? 싶은 느낌이 들고 어떤 방식이 더 나은지 잘 모르겠다. 나아중에 다시 보면 뭐가 더 가독성이 좋을지는 알 수 있을까?
#### 기존의 if - else if 문을 if + 삼항연산자로 바꿔봤다.

</br>

## __✅ 배열 결과 출력__ : [이전풀이(1103)](log_1103/../../daily_study_log/log_1103/arrayHandling_5_printArray.js) ➞ [새로운풀이(1103)](1103_printArray.js)
### 1. 위와 같이 예시 데이터를 별도 파일로 분리
```js
export default [{}]
import jsonTree from './data/json_tree.js';
```
### 2. 위와 같이 helper 함수를 구현하여 재귀 방식으로 호출하여 풀었다.
```js
function getNamesOfSk(data) {
    const result = [];
    const search = (node) => {
        if(node['type'] === 'sk'){
            result.push(node['name']);
        }
        
        for(const child of node['childnode']){
            search(child);
        }
    }

    search(data.pop());
    return result;
}
```
#### 분명 풀었던 문제 같은데 기존 풀이를 돌려보니 안돌아간다. (띠용ㅎㅎ...?! 해결 못했던 문제였나?! length 도 lenth 로 오타나있고...ㅎ...ㅠ...)
#### 위의 문제와 같이 내부에 helper 함수를 구현해서 재귀 방식으로 풀었는데 처음 함수를 호출할때 search(data.pop()) 말고 다른 방식 없을까 고민했는데 잘 해결은 안됐다.

</br>

## __✅ reduce 만들기__ : [이전풀이(1103)](../daily_study_log/log_1103/arrayHandling_6_reduce.js) ➞ [새로운풀이(1103)](1103_myReduce.js)
#### 이전에는 reduce 함수에대해 이해가 부족해 시도도 제대로 못했었는데 다시 도전을 해보니 생각보다 쉽게 구현했다!
#### 초기값이 배열인 경우를 따로 처리를 해줘야 하나 싶었는데 삼항 연산자에서 걸러지지 않고 그대로 빈 배열로 초기화 되는걸 보고 안심했다!