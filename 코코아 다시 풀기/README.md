# __πͺ μ½μ½μ λ―Έμ λ€μ νμ΄λ³΄κΈ°__
> ### μ½λμ€μΏΌλ λ§μ€ν°μ¦ μ½μ€ μμ μ  λͺ κ°μ λ―Έμμ λ€μ νμ΄λ³΄κΈ°λ‘ νλ€.
---

## __βοΈ WEEK 1 - 1__

## __βλ€κ°νμ λμ΄ κ΅¬νκΈ°__ : [μ΄μ  νμ΄(1101)](log_1101/../../daily_study_log/log_1101/getAreaProject.js) β [μλ‘μ΄ νμ΄(1228)](1101_getArea.js)
### 1. κ°λ³ μΈμλ₯Ό λμνκΈ° μν΄ arguments λ₯Ό μ¬μ©νλ μ΄μ κ³Ό λ¬λ¦¬ rest parameter λ₯Ό μ¬μ©ν΄ κ΅¬ννλ€.
```js
/* μ΄μ  νμ΄ */
function getArea(){
    const inputArguments = Array.from(arguments);
    ...
    const shape = inputArguments[0];
    const values = inputArguments.slice(1);
}

/* μλ‘μ΄ νμ΄ */
function getArea(shape, ...params) {
    ...
    const result = getAreaOf(shape, params);
    ...
    return result;
}
```
</br>

### 2. μ ν¨ν κ°μ μ²΄ν¬νκΈ° μν΄ 4κ°μ ν¨μλ₯Ό μ¬μ©νλ μ΄μ κ³Ό λ¬λ¦¬ 2κ°μ ν¨μλ‘ μ€μλ€.
```js
/* μ΄μ  νμ΄ */
function isValidArguments(arg){} // -> call isValidShape(), isValidSize()
function isValidShape(shape, argCount){}
function isValidSize(shape, sizeArray){} // -> call isValidRadiusOfCircle()
function isValidRadiusOfCircle(radiusArray){}

/* μλ‘μ΄ νμ΄ */
function isInValidParams(shape, params) {
    const count = params.length;
    const shapeArgCount = {
        circle: [1, 2],
        rect : [2],
        trapezoid : [3]
    };

    // κ·Όλ° μ΄ λΆλΆμ΄ κ°λμ±μ΄ μ’ λ¨μ΄μ§λ μΆμ΄μ κ³ λ―Ό...
    if(!shapeArgCount[shape]) return true;
    if(!shapeArgCount[shape].includes(count)) return true;
    if(!checkParamsValue(params)) return true;
    // μ΄κ²λ ν¨μλ‘ λ°λ‘ λΊκΉ κ³ λ―Ό...
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

### 3. λ°°μ΄ λμ€νΈλ­μ²λ§μ μ¬μ©ν΄λ΄.
```js
/* μ΄μ  νμ΄ */
var getResult = {
    circle : function(){ return getCircleArea(values) },
    rect : function(){ return getRectArea(values[0], values[1])},
    trapezoid : function(){ return getTrapezoidArea(values[0], values[1], values[2])}
};
function calcCircleArea(radius){}
function getRectArea(width, height){}
function getTrapezoidArea(top, bottom, height){}

/* μλ‘μ΄ νμ΄ */
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

### μ¬μ€ μλλ μλ κ°μ λλμΌλ‘ ν΄λ³΄κ³  μΆμλ€.

```js
function getTrapArea([top, bottom, height]){
    return (top + bottom) * height / 2;
}
```

#### κ·Όλ° μ΄λ κ² νλλ μ€λ₯κ° λλ€...μ΄λ° λ°©μμΌλ‘λ μ¬μ©ν  μ μλ κ² κ°λ€. ( Β΄. _.`)....
#### μ΄μ©λ μ μ©λ μ΄λ° μμΌλ‘ κ΅¬ννλ©΄ κΉλνκ² λ³΄μ΄κΈ΄ν΄λ ν¨μμ λλ¦½μ±μ΄ λ?μμ§λκ±° κ°μΌλκΉ ν¨μ μ€ν μ  λΆλ¦¬ν΄μ λ§€κ°λ³μλ‘ μ£Όλ μ΄μ  λ°©μμ΄ λ λμκ±° κ°λ€....

</br>

### 4. κΈ°μ‘΄μλ do while λ¬ΈμΌλ‘ κ΅¬ννλ μμ λμ΄ κ΅¬νλ κΈ°λ₯μ μ¬κ· λ°©μμΌλ‘ κ΅¬νν΄λ΄€λ€.
```js
/* μ΄μ  νμ΄ */
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

/* μλ‘μ΄ νμ΄ */
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
#### calculate λΌλ μ¬κ· Helper ν¨μλ₯Ό κ΅¬νν΄μ νμ¬μ λ°μ§λ¦μ΄ max λ°μ§λ¦κ³Ό κ°μμ§λκΉμ§ λ°λ³΅ν΄μ νΈμΆνλ λ°©μμΌλ‘ κ΅¬ννλ€.
#### λν κΈ°μ‘΄μ getMaxRadius λΌλ λ³λ ν¨μλ₯Ό ν΅ν΄ μ΄κΈ°ν μμΌ°λ max λ°μ§λ¦ κ°μ || μ°μ°μλ₯Ό μ¬μ©ν΄μ μ΄κΈ°ννλ€.

---

## __βοΈ WEEK 1 - 2__
## __β λ°°μ΄ λ§λ€κΈ°__ : [μ΄μ νμ΄(1103)](log_1103/../../daily_study_log/log_1103/arrayHandling_4_createArray.js) β [μλ‘μ΄νμ΄(1228)](1103_createArray.js)

### 1. μμ λ°μ΄ν°λ₯Ό λ³λ νμΌλ‘ λΆλ¦¬ν΄μ module λ°©μμΌλ‘ λΆλ¬μ μ¬μ©ν¨
```js
export default data;
import data from './data/exampleData.js';
```

### 2. μ¬κ· λ°©μμ μμ ν¨.
```js
/* μ΄μ  νμ΄ */
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

/* μλ‘μ΄ νμ΄ */
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
#### travelObject μ μ²΄λ₯Ό μ¬κ·λ‘ νΈμΆνλ κΈ°μ‘΄κ³Ό λ€λ₯΄κ² search λΌλ helper ν¨μλ₯Ό κ΅¬νν΄ ν΄λΉ ν¨μλ₯Ό μ¬κ·μ μΌλ‘ νΈμΆνλλ‘ κ΅¬νν¨
#### κ·Όλ° λΉκ΅ν΄λ³΄λ κ΅³μ΄? μΆμ λλμ΄ λ€κ³  μ΄λ€ λ°©μμ΄ λ λμμ§ μ λͺ¨λ₯΄κ² λ€. λμμ€μ λ€μ λ³΄λ©΄ λ­κ° λ κ°λμ±μ΄ μ’μμ§λ μ μ μμκΉ?
#### κΈ°μ‘΄μ if - else if λ¬Έμ if + μΌν­μ°μ°μλ‘ λ°κΏλ΄€λ€.

</br>

## __β λ°°μ΄ κ²°κ³Ό μΆλ ₯__ : [μ΄μ νμ΄(1103)](log_1103/../../daily_study_log/log_1103/arrayHandling_5_printArray.js) β [μλ‘μ΄νμ΄(1228)](1103_printArray.js)
### 1. μμ κ°μ΄ μμ λ°μ΄ν°λ₯Ό λ³λ νμΌλ‘ λΆλ¦¬
```js
export default [{}]
import jsonTree from './data/json_tree.js';
```
### 2. μμ κ°μ΄ helper ν¨μλ₯Ό κ΅¬ννμ¬ μ¬κ· λ°©μμΌλ‘ νΈμΆνμ¬ νμλ€.
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
#### λΆλͺ νμλ λ¬Έμ  κ°μλ° κΈ°μ‘΄ νμ΄λ₯Ό λλ €λ³΄λ μλμκ°λ€. (λ μ©γγ...?! ν΄κ²° λͺ»νλ λ¬Έμ μλ?! length λ lenth λ‘ μ€νλμκ³ ...γ...γ ...)
#### μμ λ¬Έμ μ κ°μ΄ λ΄λΆμ helper ν¨μλ₯Ό κ΅¬νν΄μ μ¬κ· λ°©μμΌλ‘ νμλλ° μ²μ ν¨μλ₯Ό νΈμΆν λ search(data.pop()) λ§κ³  λ€λ₯Έ λ°©μ μμκΉ κ³ λ―Όνλλ° μ ν΄κ²°μ μλλ€.

</br>

## __β reduce λ§λ€κΈ°__ : [μ΄μ νμ΄(1103)](../daily_study_log/log_1103/arrayHandling_6_reduce.js) β [μλ‘μ΄νμ΄(1228)](1103_myReduce.js)
#### μ΄μ μλ reduce ν¨μμλν΄ μ΄ν΄κ° λΆμ‘±ν΄ μλλ μ λλ‘ λͺ»νμλλ° λ€μ λμ μ ν΄λ³΄λ μκ°λ³΄λ€ μ½κ² κ΅¬ννλ€!
#### μ΄κΈ°κ°μ΄ λ°°μ΄μΈ κ²½μ°λ₯Ό λ°λ‘ μ²λ¦¬λ₯Ό ν΄μ€μΌ νλ μΆμλλ° μΌν­ μ°μ°μμμ κ±Έλ¬μ§μ§ μκ³  κ·Έλλ‘ λΉ λ°°μ΄λ‘ μ΄κΈ°ν λλκ±Έ λ³΄κ³  μμ¬νλ€!