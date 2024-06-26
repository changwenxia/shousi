// 1.冒泡排序
// 思路：冒泡排序法的运行机制是通过循环遍历元素，并调整相邻元素顺序的一种简单排序方法。
// 它重复地走访要排序的元素列，依次比较两个相邻的元素，如果他们的顺序（如从大到小、首字母从A到Z）错误就把他们位置交换过来.
function bubbleSort(arr) {
  for(let i = 0;i<arr.length-1;i++) {
    for(let j=0;j<arr.length-1-i; j++){
      if(arr[j] > arr[j+1]) [arr[j], arr[j+1]]= [ arr[j+1],arr[j]]
    }
  }
  return arr;
};
// 改良版  每次最大值放到最右后，会将本轮最后一个操作的位置作为下一轮的终点，可以减少不必要的一些冒泡
function bubbleSort1(arr){
  let i = arr.length-1;
  while(i>0){
    let pos = 0;
    for(let j=0;j< i; j++){
      pos=j;
      if(arr[j]>arr[j+1])[arr[j], arr[j+1]]= [ arr[j+1],arr[j]]
    }
    i=pos;
  }
  console.log(arr);
}
// 2，快速排序
// 思路：选择一个元素作为基数（通常是第一个元素），把比基数小的元素放到它左边，比基数大的元素放到它右边（相当于二分），再不断递归基数左右两边的序列。
function quickSort(arr){
  if(arr.length<=1)return arr;
  let leftArr=[],rightArr=[];
  for(let i=1;i< arr.length; i++){
    if(arr[i]<arr[0]){
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }
  }
  return [].concat(quickSort(leftArr),arr[0],quickSort(rightArr))
}
// 3.插入排序
// 依然要通过两层循环，外循环便利每个数组项，内循环从外循环的数组项（i）开始往前遍历，如果当前数组项比前一个小，则与前一个调换位置，这样一直循环重复，数组就逐渐归位了；
function insertSort(arr){
  for(let i=1;i< arr.length; i++){
    for(j=i;j>0;j--){
      if(arr[j]<arr[j-1]) [arr[j], arr[j-1]]= [ arr[j-1],arr[j]]
    }
    // 优化
    // 接下来要改进插入排序，减少数组项调换复制操作，替代为单向复制，在内循环中不再是比前一位小就调换，而是先将 j（当前项） 的值取出，将 j-1 的值复制进目前的 j 项中，先不改变 j-1 的值，然后再拿当前项去跟 j-2 比，如果当前项还是更小，则重复之前操作，直到正确位置，再将当前项的值复制进去，这样就成功减少了近一半的赋值操作了；（代码下图②）
    // let curNum = arr[i];
    // let rightIndex = i;
    // for(let j=i;j>0&& curNum< arr[j-1]; j--){
    //   arr[j]=arr[j-1];
    //   rightIndex=j-1;
    // }
    // arr[rightIndex]=curNum;
  }
  return arr
}
// 4. 选择排序
// 思路：和冒泡排序相似，区别在于选择排序是将每一个元素和它后面的元素进行比较和交换。
function selectSort(arr){
  for(let i=0;i< arr.length; i++){
    for(let j=i+1;j< arr.length; j++){
      if(arr[i]>arr[j])   [arr[i],arr[j]] = [arr[j], arr[i]]
    }
  }
  return arr;
}
// 5.希尔排序
// 思路：希尔排序将插入排序作为它的子进程，它的核心是一个叫步长(gap)的概念，这个步长可以理解为一个类似疏密程度的概念。它共有3层循环，外层是以步长为循环，一般取数组的一半，循环一次再除一半，中层和里层就是插入排序的操作，不过不是跟前一项比，是跟当前索引减去步长后的那一项比。说到这里就可以理解为什么我说步长是类似疏密程度的概念，当步长不断除于2，变得越来越小，直到零停止循环，这个过程中，插入排序的比较项间越来越近，逐渐数组被排列出来。
function shellSort(arr){
  let gap = Math.floor(arr.length/2);
  while(gap>0){
    for(let i=gap;i< arr.length; i++){
      for(let j=i;j>0;j-=gap ){
        if(arr[j]<arr[j-gap]) [arr[j],arr[j-gap]]= [arr[j-gap],arr[j]]
      }
    }
    gap = Math.floor(gap/2)
  }
  return arr
}
// 6.桶排序
// 取 n 个桶，根据数组的最大值和最小值确认每个桶存放的数的区间，将数组元素插入到相应的桶里，最后再合并各个桶。
function bucketSort(arr){
  let data = Array.from({length:10}).fill(0);
  let newArr = [];
  arr.forEach(el => {
    if(data[el]!=="undefined") {
      data[el]++ 
    } else {
      data[el]=1
    }
  })
  for(let i=0;i< data.length; i++){
    for(let j=0;j< data[i]; j++){
      newArr.push(i)
    }
  }
  return newArr;  // [0, 2, 3, 3, 5, 8, 8, 9]
}
let arr = [8, 3, 5, 9, 2, 3, 0, 8];
console.log(bucketSort(arr));