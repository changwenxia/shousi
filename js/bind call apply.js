// bind call apply
Function.prototype.bind_ = function (context) {
    if (typeof this !== 'function') {
        throw new Error('必须函数调用bind');
    }
    // 获取参数
    let args = [...arguments].slice(1);
    let fn = this;
    return function Fn() {
        // 当前的这个 arguments 是指 Fn 的参数
        return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments)); 
    }
}
// call
Function.prototype.call = function (context) {
    if (typeof this !== 'function') {
        throw new Error('必须函数调用call');
    }
    // 获取参数
    let args = [...arguments].slice(1);
    let res = null;
    context = context || window;
    context.fn = this;
    res = context.fn(...args);
    delete context.fn;
    return res;
}
// apply
Function.prototype.apply = function (context) {
    if (typeof this !== "function") {
        throw new Error("Type error");
    }
    let result = null;
    context = context || window;
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    if (arguments[1]) {
        result = context[fnSymbol](...arguments[1]);
    } else {
        result = context[fnSymbol]();
    }
    delete context[fnSymbol];
    return result;
}
// var z = 0;
// var obj = {
//     z: 1
// };

// function fn(x, y) {
//     this.name = '听风是风';
//     console.log(this.z);
//     console.log(x);
//     console.log(y);
// };
// fn.prototype.age = 26;

// var bound = fn.bind_(obj, 2);
// var person = new bound(3); //undefined 2 3

// // console.log(person.name); //听风是风
// // console.log(person.age); //26
// person.__proto__.age = 18;
// // var person = new fn();
// // console.log(person.age); //26
// var a = new bound();
// console.log(a.age);