// 数组去重
function removeDup(arr) {
  let result = [];
  let hasMap = {};
  for (let i = 0; i < arr.length; i++) {
    if (!hasMap[arr[i]]) {
      hasMap[arr[i]] = true;
      result.push(arr[i])
    }
  }
  return result;
};
let arr = [1, 2, 6, 6, 45, 56, 45, 3]

// console.log(Array.from(new Set(arr)));
// console.log([...new Set(arr)]);

// 判断数组中哪几个数相加等于9 
// let twoSum = function(nums, target) {
//   const map = new Map();
//   for(let i =0;i<nums.length;i++) {
//       const res = target - nums[i];
//       if (map.has(res)) {
//           return [map.get(res), nums[i]]
//       } else {
//           map.set(nums[i], nums[i])
//       }
//   }
// }
// console.log(twoSum([2, 7, 11, 15],9)); 