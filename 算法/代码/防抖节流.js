// 防抖  是任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行，一般用于输入框实时搜索；
    function debouce(fn, time) {
      let timer = null;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, time)
      }
    }
    // 节流节流是规定函数在指定的时间间隔内只执行一次，一般用于scroll事件。
    function throttle(fn, time) {
      let canRun = true;
      return () => {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
          fn.apply(this, arguments);
          canRun = true;
        }, time)
      }
    }


    const arr1 = [33, 11, 55, 22, 66];
    const arr2 = [{age: 55}, {age: 22}, {age: 11}, {age: 66}, {age: 33}]
    // 数组arr2中每项都是一个对象，对象中age属性 === 数组arr1中的项
    // 将arr2数组根据对象的age值在arr1中的位置排序， 排序后的结果为 `const arr2 = [ {age: 33}，{age: 11}, {age: 55}, {age: 22}, {age: 66}]
    function sort1(name, arr) {
      return (prev, next) => {
        return arr.indexOf(prev[name]) - arr.indexOf(next[name])
      }
    }
   
    const arr = [33, 11, 55, 22, 66]
    const obj = [{
      age: 55,
      money: 6000
    }, {
      age: 22,
      money: 3000
    }, {
      age: 11,
      money: 2000
    }, {
      age: 66,
      money: 9000
    }, {
      age: 33,
      money: 5000
    }]
    obj.sort(sort1("age", arr))
    console.log(obj);