// 递归将数字翻转
// console.log(fn(1234));

function reverseNumber(num) {
  // 处理负数
  const isNegative = num < 0;
  num = Math.abs(num);
  
  const reverse = num => {
    if (num < 10)  return num;
    const num1 = num % 10;
    const num2 = reverse(Math.floor(num / 10));
    return Number(`${num1}${num2}`);
  }
  const res = reverse(num);
  return isNegative ? -res : res;
}

let aa = reverseNumber(12340)
console.log(aa);
console.log(typeof aa);