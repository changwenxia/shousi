let arr1 = [1,8,9,4,5,12]
let arr2 = [2,3,10,11,6,13,14,15,16,17,18,19,20]
// let arrcon = []
// var i1=i2 = 0
//   while(i1 < arr1.length && i2 < arr2.length){
//     if(arr1[i1] < arr2[i2]){
//       arrcon.push(arr1.slice(i1)[0])
//       i1++
//     }else if(arr1[i1] > arr2[i2]){
//       arrcon.push(arr2.slice(i2)[0])
//       i2++
//     }else{
//       if(arr1[i1]) arrcon.push(arr1.slice(i1)[0])
//       if(arr2[i2]) arrcon.push(arr2.slice(i2)[0])
//       i1++
//       i2++
//     }
//   }
// console.log(arrcon)

// function arrSort(arr1, arr2) {
//   var [i,j] = [0,0];
//   let newArr = [];
//   while(i < arr1.length || j <arr2.length) {
//       if (arr1[i] < arr2[j]) {
//           newArr.push(arr1[i]);
//           i++
//       } else if (arr1[i] > arr2[j]) {
//           newArr.push(arr2[j])
//           j++
//       } else {
//           if(arr1[i]) newArr.push(arr1[i]);
//           if(arr2[j]) newArr.push(arr2[j]);
//           i++;
//           j++
//       }
//   }
//   return newArr
// }

// let arrs = arrSort(arr1,arr2);

// console.log(arrs);

let arrconcat = []
// arrconcat.concat(arr1,arr2)
// console.log(arrconcat.concat(arr1,arr2).sort(hmy))
// function hmy(a,b){
//   return a-b
// }
console.log(arrconcat.concat(arr1, arr2).sort((a, b) => a-b));