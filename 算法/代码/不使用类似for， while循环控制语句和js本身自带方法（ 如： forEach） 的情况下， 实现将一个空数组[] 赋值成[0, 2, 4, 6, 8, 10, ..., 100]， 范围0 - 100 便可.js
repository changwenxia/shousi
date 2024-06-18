// 不使用类似for，while循环控制语句和js本身自带方法（如：forEach）的情况下，
  // 实现将一个空数组[]赋值成[0,2,4,6,8,10,...,100]，范围0-100便可。
  let arr = [];

  function addNumber(min, max) {
    if (min <= max) {
      arr.push(min);
      min += 2;
      addNumber(min, max)
    }
  }
  addNumber(0, 100);
