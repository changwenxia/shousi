// 查找字符串中的最长公共前缀
// 示例: 输入: [“flower”,“flow”,“flight”]
// 输出: “fl”
// 思路：先取到数组第一个元素的值，将后面每个元素的字符和第一个元素的值做比较，如果不一样或者遍历完返回结果，一样的话，将相同的字符拼接到result
// 纵向扫描：逐个字符比较所有字符串的相同位置。
// 提前终止：如果某个字符不匹配，或者某个字符串已经遍历完，直接返回当前的前缀。

// 此方法空间复杂度o(n)，时间复杂度o(n, m)，推荐第二种
// function findMaxAndInd(arr){
//   let result = "", firstStr = arr[0]
//   if(!arr.length)return result;
//   for(let i=0;i<firstStr.length;i++){
//     for(let j=1;j<arr.length;j++){
//       if(firstStr[i]!==arr[j][i]){
//         return result;
//       }
//     }
//     result +=firstStr[i]
//   }
//   return result;
// }

// 此方法空间复杂度o(1)，时间复杂度o(n, m)，推荐
function longestCommonPrefix(strs) {
  if(strs.length === 0) {
    return '';
  }

  for(let i = 0; i < strs[0].length; i ++) {
    const char = strs[0][i];
    for(let j = 1; j <strs.length; j++) {
      if (char !== strs[j][i] || i === strs[j].length) {
        return strs[0].substring(0, i);
      }
    }
  }
  return strs[0];
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
