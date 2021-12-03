// forEach 만들기

const array1 = ['a', 'b', 'c'];

function forEach(arr, fn){
    for(let i = 0; i < arr.length; i++){
        fn(arr[i]);
    }
}

const print = element => console.log(element);
forEach(array1, print);

