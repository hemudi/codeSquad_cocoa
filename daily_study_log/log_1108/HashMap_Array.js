/* 체이닝 => 배열로 구현 */

const data = function (key, value){
    this.key = key;
    this.value = value;
}

function HashMap(size) {
    this.mapSize = size;
    this.hashTable = new Array(this.mapSize); // 명시적으로 생성하는 편이 나을까
    
    /* --- [0] Hash Function --- */
    HashMap.prototype.getHashAddress = function (key) {
        let asciiSum = 0;

        for(let index = 0; index < key.length; index++){
            asciiSum += key.charCodeAt(index);
        }

        return asciiSum % this.mapSize;
    }
}