// 查找字符串中的最长公共前缀
// 示例: 输入: [“flower”,“flow”,“flight”]
// 输出: “fl”
// 思路：先取到数组第一个元素的值，将后面每个元素的字符和第一个元素的值做比较，如果不一样返回结果，一样的话，将相同的字符拼接到result
function findMaxAndInd(arr){
  let result = "", firstStr = arr[0]
  if(!arr.length)return result;
  for(let i=0;i<firstStr.length;i++){
    for(let j=1;j<arr.length;j++){
      if(firstStr[i]!==arr[j][i]){
        return result;
      }
    }
    result +=firstStr[i]
  }
  return result;
}
console.log(findMaxAndInd(["flower", "flow", "flight"]));
