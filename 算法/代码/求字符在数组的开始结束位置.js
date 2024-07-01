// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值，返回 [-1, -1]。
// 示例
// nums = [5,7,7,8,8,10], target = 8 输出: [3,4]
// nums = [5,7,7,8,8,10], target = 6 输出: [-1,-1]

// 思路：1. 开始位置 indexOf
//      2. 结束位置：翻转数组，求arr.length-(indexOf+1)
function pop(arr, target){
 const tmp = [];
 tmp[0] = arr.indexOf(target);
 tmp[1] = arr.reverse().indexOf(target);
 console.log(tmp[0],tmp[1]);
 if(tmp[1] !== -1){
  tmp[1] = arr.length - tmp[1]-1;
 }
 console.log(tmp);
 return tmp;
}
const nums = [5,7,7,8,8,10];
const target = 8;
pop(nums, target);