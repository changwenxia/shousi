function flat(arr){
  let flatArr = [];
  for(let i = 0;i < arr.length;i++){
    console.log( Array.isArray(arr));
    if(Array.isArray(arr[i])){
      // flatArr = arr.concat(flat(arr[i]));
      flat(arr);
    }else{
      return flatArr.push(arr[i]);
    }
    return flatArr;
  }
}
const arr = [1, [4, 5, [6, 7]]];
console.log(flat(arr));




