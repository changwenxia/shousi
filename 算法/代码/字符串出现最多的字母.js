// 统计一个字符串出现最多的字母
  // 输入 ： afjghdfraaaasdenas
  // 输出 ： a
  // 思路：1. 得到每个字符出现的次数：遍历字符串，如果新对象里没有字符，将新对象的对应字符值=1；有的话+1；  
  // 2.查找新对象中出现次数最多的字符:遍历新对象，如果新对象中字符出现次数大于前一个字符的话，将此字符赋给maxChar，值赋给新maxValue，一此循环，找到出现最多的字符
  function getMaxAndIndex(arr){
    console.log(arr.length);
    if(!arr.length)return;
    if(arr.length===1)return 1;
    let h={},maxnum=0,maxStr="";
    for(let i=0;i<arr.length;i++){
      let a=arr[i];
      h[a]===undefined ? h[a]=1: (h[a]++)
      if(h[a]>maxnum){
        maxnum=h[a];
        maxStr=a;
      }
    };
    return maxStr;
  }
  console.log(getMaxAndIndex('afjghdfraaaasdenas'));