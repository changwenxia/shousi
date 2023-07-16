// new 实现
// 首先创一个新的空对象。
// 根据原型链，设置空对象的 __proto__ 为构造函数的 prototype 。
// 构造函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
// 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象。
function myNew(fn) {
    let obj = Object.create(fn.prototype);
    let res = fn.apply(obj, [...arguments].slice(1));
    return typeof res === 'object' ? res : obj;
}

function A(par) {
    this.one = 1,
    this.two = 2,
    this.print = function() {
        console.log(this.one, par);
    }
};
const b = myNew(A, 23);
// b.print();