//重要的事情说3遍！重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。例如：
//repeat("", 3) 应该返回"*".   //repeat("abc", 3) 应该返回"abcabcabc".
function repeat(str, num) {
  if (num < 0) return "";
  let res = "";
  for (let i = 0; i < num; i++) {
    res += str;
  }
  return res;
}
