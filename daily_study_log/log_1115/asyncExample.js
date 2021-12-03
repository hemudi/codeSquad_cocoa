/* 동기 상황 */
// function plus(){
// 	let a = 1;
// 	setTimeout(()=>console.log(++a), 1000);
// 	return a;
// }

// const result = plus();
// console.log('result:', result);

// /* 비동기 상황 */
// const baseData = [1,2,3,4,5,6,100];

// const asyncRun = (arr, fn) => {
// 	for(let i = 0; i < arr.length; i++) {
// 		setTimeout( () => fn(i), 1000);
// 	}
// }

// asyncRun(baseData, idx => console.log(idx));

// /* forEach 로 변경 */
// const baseData = [1,2,3,4,5,6,100];

// const asyncRun = (arr, fn) => {
// 	arr.forEach((v,i) => {
// 		setTimeout( () => fn(i), 1000);
// 	});
// }

// asyncRun(baseData, idx => console.log(idx));

/* 비동기 상황 예 : 동기 + 비동기 + 동기 */
// const baseData = [1,2,3,4,5,6,100];

// function sync(){
// 	baseData.forEach((v,i) => {
// 		console.log("sync", i);
// 	});
// }

// const asyncRun = (arr, fn) => {
// 	arr.forEach((v,i) => {
// 		setTimeout(() => fn(i), 1000);
// 	});
// }

// function sync2(){
// 	baseData.forEach((v,i) => {
// 		console.log("sync 2", i);
// 	});
// }

// asyncRun(baseData, idx => console.log(idx));
// sync();
// sync2();

/* 비동기 상황 예 => 비동기 + 비동기 */
const baseData = [1,2,3,4,5,6,100];

const asyncRun = (arr, fn) => {
    arr.forEach((v,i) => {
        setTimeout(() => {
            setTimeout(() => {
                console.log("cb 2");
                fn(i);
            }, 1000);
            console.log("cb 1");
        }, 1000);
    })
}

asyncRun(baseData, idx => console.log(idx));7n