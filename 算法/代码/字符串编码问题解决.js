//  一， 用正则表达式来将字符串 "I? love ?? the ?great ? ?wall in ?beijing"
  // 更改为： "I love the Great Wall in Beijing"，
  // 主要是为了解决编码的问题导致的问题， 规律：
  // 1， 乱码只有两种特殊字符分别是 '?' 和 ' ';
  // 2， 如果乱码的末尾是 '?'  则它的下一位字母肯定是大写；
  let str = "I? love ?? the ?great ? ?wall in ?beijing";

  function regStr(str) {
    let strArr = str.split("?");
    strArr.forEach((val, key) => {
      strArr[key] = strArr[key].charAt(0).toUpperCase() + strArr[key].slice(1)
    })
    strArr = strArr.join("").replace(/\?/g, "")
    return strArr;
  }
  regStr(str);
