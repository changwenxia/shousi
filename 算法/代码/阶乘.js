// 阶乘  阶乘通常简写成 n! 5! = 1 * 2 * 3 * 4 * 5 = 120

function factorialize(num) {
  let res = 1;
  for(let i = num;i>0;i--) {
    res *= i;
  }
  return res;
}
console.log(factorialize(5));
