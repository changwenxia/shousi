// 手写bind
Function.prototype.bind = function (context, ...bindments) {
    if(typeof this !== 'function') {
        throw new Error('必须函数调用bind');
    }
    const func = this;
    return function F(...callments) {
        let args = bindments.concat(callments);
        if (this instanceof F) return new func(...args);
        return func.call(context, ...args);
    };
};
function one(a, b) {
    this.a = a;
    this.b = b;
    console.log(this)
  }
  var obj = {
    name: 'yiyi'
  }
  var child = one.bind(obj, 2);
  child(3);
  
  var two = new child(4);
  console.log(two)
// call
Function.prototype.call = function (context, ...callargs) {
    context = context || window;
    context.func = this;
    if (typeof context.func !== "function") {
        throw new TypeError("必须是函数调用call");
    }
    let res = context.func(...callargs);
    delete context.func;
    return res;
};
// apply
Function.prototype.apply = function (context, arr) {
    context = context || window;
    context.func = this;
    if (typeof context.func !== "function") {
        throw new TypeError("必须是函数调用apply");
    }
    let res = context.func(...arr);
    delete context.func;
    return res;
};

// var foo = {
//     name: "Selina",
// };
// var name = "Chirs";

// function bar(job, age) {
//     console.log(this.name);
//     console.log(job, age);
// }
// bar.call(foo, "programmer", 20);
// bar.apply(null, ["teacher", 25]);

