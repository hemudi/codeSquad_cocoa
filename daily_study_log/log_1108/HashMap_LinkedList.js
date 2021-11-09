const Node = function (key, value, address, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.address = address;
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

    /* --- [1] put --- */
    HashMap.prototype.put = function (key, value) {
        let address = this.getHashAddress(key);

        // first node
        if(this.hashTable[address] === undefined){
            this.hashTable[address] = new Node(key, value, address);
            return;
        }

        // other node
        this.getLastNode(this.hashTable[address]).next = new Node(key, value, address);
    }

    /* --- [2] remove --- */
    HashMap.prototype.remove = function (key) {
        let address = this.getHashAddress(key);
        let firstNode = this.hashTable[address];
        let preMatchNode = this.getNode(firstNode, key, 1);

        if(preMatchNode === null) {
            console.log("존재 안함");
            return;
        }

        // first
        if(preMatchNode === undefined){
            this.hashTable[address] = firstNode.next;
            return;
        }

        // other
        preMatchNode.next = preMatchNode.next.next;
    }

    /* --- [3] containsKey --- */
    HashMap.prototype.containsKey = function (key) {
        let address = this.getHashAddress(key);
        let startNode = this.hashTable[address];
        return this.getNode(startNode, key) != null;
    }

    /* --- [4] get --- */
    HashMap.prototype.get = function (key) {
        let address = this.getHashAddress(key);
        let startNode = this.hashTable[address];
        let matchNode = this.getNode(startNode, key);
        return matchNode != null ? matchNode.value : null;
    }

    /* --- [5] isEmpty --- */
    HashMap.prototype.isEmpty = function () {
        for(const node of this.hashTable){
            if(node == null) continue;
            return false;
        }

        return true;
    }

    /* --- [6] keys --- */
    HashMap.prototype.keys = function () {
        let keyList = [];

        for(const node of this.hashTable){
            if(node == null) continue;
            keyList.push(...this.getNodeListKeys(node));
        }

        return keyList;
    }

    /* --- [7] replace --- */
    HashMap.prototype.replace = function (key, value) {
        const address = this.getHashAddress(key);
        let matchNode = this.getNode(this.hashTable[address], key);
        return matchNode != null ? matchNode.value = value : false;
    }

    /* --- [8] size --- */
    HashMap.prototype.size = function () {
        let count = 0;

        for(const node of this.hashTable){
            if(node == null) continue;
            count += this.getNodeListKeys(node).length;
        }

        return count;
    }

    /* --- [9] clear --- */
    HashMap.prototype.clear = function () {
        this.hashTable = new Array(this.mapSize);
    }

    /* --- [*] HashMap 출력용 --- */
    HashMap.prototype.toString = function(){
        let resultStr = '';

        for(const node of this.hashTable){
            if(node == null) continue;
            resultStr += this.getNodeListToStr(node);
        }

        return resultStr.length != 0 ? resultStr.substring(0, resultStr.length - 1) : '비어있는 HashMap';
    }

    /* --- [*] Linked List 구조 때문에 구현한 메소드 --- */
    // 마지막 node 반환
    HashMap.prototype.getLastNode = function(node) {
        return node.next == null ? node : this.getLastNode(node.next);
    }

    // 찾는 노드 반환 => option 1 : 찾는 노드의 이전 노드를 반환
    // 재귀로 구현할 수 있지 않을까
    HashMap.prototype.getNode = function (node, key, option = 0){
        let preNode;

        while(node != null){
            if(node.key === key) return option == 1 ? preNode : node;
            preNode = node;
            node = node.next;
        }

        return null;
    }

    // node list 의 key 들을 반환
    HashMap.prototype.getNodeListKeys = function(currentNode){
        let keyList = [];
        
        do {
            keyList.push(currentNode.key);
            currentNode = currentNode.next;
        } while(currentNode != null);

        return keyList;
    }

    // 노드 리스트의 키들을 문자열로 합침
    HashMap.prototype.getNodeListToStr = function(node){
        let result = '[' + node.address + ']';

        do {
            result +=  ' → ' + node.key + ' : ' + node.value;
            node = node.next;
        } while(node != null);

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

// 9
hashMap.put('오미자청', '9,000원');
hashMap.put('방울토마토', '9,500원');

// console.log(hashMap.toString());
// console.log(hashMap);

// hashMap.remove('귤');

// console.log(hashMap.toString());
// console.log(hashMap);

// console.log(hashMap.containsKey('귤'));
// console.log(hashMap.containsKey('프레첼'));

// console.log(hashMap.get('귤'));
// console.log(hashMap.get('방울토마토'));

// console.log(hashMap.isEmpty());

// console.log(hashMap.keys());
// console.log(hashMap.replace('에그타르트', '3,000원'));
// console.log(hashMap.toString());

// console.log(hashMap.size());
// console.log(hashMap.toString());
// hashMap.clear();
// console.log(hashMap.toString());
// console.log(hashMap.size());