// 思路：1.从第一层开始获取key,并判断值得类型，设置入新临时值；
//      2.如果是数组和对象，则递归执行步骤一
function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone;
}
let a = [20,8,6,19],
b = deepClone(a);
a[1] = 2;
console.log(a, b);