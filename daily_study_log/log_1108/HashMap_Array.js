/* 체이닝 => 배열로 구현 */

const Data = function (key, value){
    this.key = key;
    this.value = value;
}

function HashMap(size) {
    this.mapSize = size;
    this.hashTable = [];
    
    /* --- [0] Hash Function --- */
    HashMap.prototype.getHashAddress = function (key) {
        let asciiSum = 0;

        for(let index = 0; index < key.length; index++){
            asciiSum += key.charCodeAt(index);
        }

        return asciiSum % this.mapSize;
    }

    /* --- [1] put --- */
    HashMap.prototype.put = function (key, value) {
        let address = this.getHashAddress(key);
        
        if(this.hashTable[address] == null) {
            this.hashTable[address] = [];
        }

        this.hashTable[address].push(new Data(key, value))
    }

    /* --- [2] remove --- */
    HashMap.prototype.remove = function (key) {
        let address = this.getHashAddress(key);
        let bucket = this.hashTable[address];

        if(bucket == null){
            console.log("비어있음");
            return;
        }

        for(let index = 0; index < bucket.length; index++){
            if(bucket[index].key === key){
                bucket.splice(index, 1);
                this.hashTable[address] = bucket;
                return;
            }
        }

        console.log("존재 안함");
    }

    /* --- [3] containsKey --- */
    HashMap.prototype.containsKey = function (key) {
        let address = this.getHashAddress(key);
        return this.getData(this.hashTable[address], key) != null ? true : false;
    }

    HashMap.prototype.getData = function (bucket, key){
        for(let data of bucket){
            if(data.key === key) return data;
        }

        return null;
    }

    /* --- [4] get --- */
    HashMap.prototype.get = function (key) {
        let address = this.getHashAddress(key);
        let data = this.getData(this.hashTable[address], key);
        return data != null ? data.value : null;
    }

    /* --- [5] isEmpty --- */
    HashMap.prototype.isEmpty = function () {
        for(const bucket of this.hashTable){
            if(bucket == null) continue;
            return false;
        }
        return true;
    }

    /* --- [6] keys --- */
    HashMap.prototype.keys = function () {
        let keyList = [];

        for(const bucket of this.hashTable){
            if(bucket == null) continue;
            keyList.push(...this.getDataKeyList(bucket));
        }

        return keyList;
    }

    HashMap.prototype.getDataKeyList = function (bucket) {
        let keyList = [];

        for(const data of bucket){
            keyList.push(data.key);
        }
        
        return keyList;
    }

    /* --- [7] replace --- */
    HashMap.prototype.replace = function (key, value) {
        const address = this.getHashAddress(key);
        const data = this.getData(this.hashTable[address], key);
        return data != null ? data.value = value : false;
    }

    /* --- [8] size --- */
    HashMap.prototype.size = function () {
        let count = 0;

        for(const bucket of this.hashTable){
            if(bucket == null) continue;
            count += bucket.length;
        }

        return count;
    }

    /* --- [9] clear --- */
    HashMap.prototype.clear = function () {
        this.hashTable = [];
    }

    /* --- [*] HashMap 출력용 --- */
    HashMap.prototype.toString = function(){
        let resultStr = '';

        for(const bucket of this.hashTable){
            if(bucket == null) continue;
            resultStr += this.getDataListToStr(bucket);
        }

        return resultStr.length != 0 ? resultStr.substring(0, resultStr.length - 1) : '비어있는 HashMap';
    }

    // 노드 리스트의 키들을 문자열로 합침
    HashMap.prototype.getDataListToStr = function(bucket){
        let result = '[' + this.getHashAddress(bucket[0].key) + ']';

        for(const data of bucket){
            result +=  ' → ' + data.key + ' : ' + data.value;
        }

        return result + '\n';
    }
}

/* test */
let hashMap = new HashMap(10);

// 4
hashMap.put('자색고구마칩', '4,000원');

// 6
hashMap.put('프레첼', '9,500원');
hashMap.put('귤', '10,000원');
hashMap.put('에그타르트', '1,500원');

// // 9
hashMap.put('오미자청', '9,000원');
hashMap.put('방울토마토', '9,500원');

console.log(hashMap.toString());
// console.log(hashMap);

hashMap.remove('귤');

console.log(hashMap.toString());

console.log(hashMap.containsKey('귤'));
console.log(hashMap.containsKey('프레첼'));

console.log(hashMap.get('귤'));
console.log(hashMap.get('방울토마토'));

console.log(hashMap.isEmpty());
console.log(hashMap.keys());

console.log(hashMap.replace('에그타르트', '3,000원'));

console.log(hashMap.toString());

console.log(hashMap.size());

console.log(hashMap.toString());
hashMap.clear();
console.log(hashMap.toString());