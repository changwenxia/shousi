//数组flat方法是ES6新增的一个特性，可以将多维数组展平为低维数组。如果不传参默认展平一层，传参可以规定展平的层级。
  function flat(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(flat(arr[i]));
      } else {
        result.push(arr[i]);
      }
      return result;
    }
  }

  // 使用递归优化 flat
  const arr = [1, [4, 5, [6, 7]]];
  const flatArr = [];
  function optimizeFlat(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        optimizeFlat(arr[i]);
      } else {
        flatArr.push(arr[i]);
      }
    }
  }
  console.log(flatArr);
  optimizeFlat(arr);

  function flattenByDeep(arr, deep) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && deep >= 1) {
        result = result.concat(flattenByDeep(arr[i], deep - 1))
      } else {
        result.push(arr[i])
      }
    }
    return result;
  };
  // 实现 (5).add(3).minus(2) =6 功能
  Number.prototype.add = function (num) {
    if (typeof num !== "number") throw new Error('请输入数字～');
    return this.valueOf() + num;
  }
  Number.prototype.minus = function (num) {
    if (typeof num !== "number") throw new Error('请输入数字～');
    return this.valueOf() - num;
  }
  // console.log((5).add(3).minus(2));