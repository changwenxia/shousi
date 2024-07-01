
// 找出最长单词，返回单词和长度
function findLongestWord(str) {
  let splitStr = str.split(" "),
    arr = [];
  for (let i in splitStr) {
    arr.push(splitStr[i].length)
  }
  return Math.max(...arr)
}

console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));
// 找出数组中最大的数
function findLargestOfArr(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(Math.max(...arr[i]))
  }
  return newArr;
}
// findLargestOfArr([
//   [4, 5, 1, 3],
//   [13, 27, 18, 26],
//   [32, 35, 37, 39],
//   [1000, 1001, 857, 1]
// ]);