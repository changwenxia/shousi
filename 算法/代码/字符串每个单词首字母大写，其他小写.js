// 字符串每个单词首字母大写，其他小写
function titleCase(str) {
  str = str.split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].toLowerCase().substring(0, 1).toUpperCase() + str[i].substring(1)
  }
  return str.join(" ")
}
