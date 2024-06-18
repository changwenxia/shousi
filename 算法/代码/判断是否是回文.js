// 判断是否是回文
function palindrome(str) {
  str = str.replace(
    /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
  str = str.replace(/\s+/g).toLowerCase();
  var arr = str.split("").reverse().join("");
  return str === arr;
}
// palindrome("eye") // 应该返回一个布尔值
// palindrome("eye") // 应该返回 true.
// palindrome("race car") // 应该返回 true.
// palindrome("not a palindrome") // 应该返回 false.
