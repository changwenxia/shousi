// 参考https://juejin.cn/post/6844904013754793991#heading-15
// 函数的特性与原型链案例
// 首先，定义一个函数，将会作为构造函数
function Foo() {}

// 实例化出来一个对象
const obj = new Foo();

// 在 Object 的原型上定义一个属性：objProp
Object.prototype.objProp = '我是 Object 原型上的属性';

// 在 Function 的原型上定义一个属性：funcProp
Function.prototype.funcProp = '我是 Function 原型上的属性';

// 你预想一下，以下这些分别会输出什么？
console.log(obj.objProp) // ?我是 Object 原型上的属性
// obj.__proto__ === Foo.prototype,  Foo.prototype.__proto__=== Object.prototype有objProp


console.log(obj.funcProp) // ?undefined
// obj.__proto__ === Foo.prototype, Foo.prototype.__proto__=== Object.prototype，Object.prototype上找不到funcProp


console.log(Foo.objProp) // ?我是 Object 原型上的属性
// Foo.__proto__ === Function.prototype, Function.prototype.__proto__=== Object.prototype, 有objProp

console.log(Foo.funcProp) // ?我是 Function 原型上的属性
// Foo.__proto__ === Function.prototype, funcProp


console.log(Object.objProp) // ?我是 Object 原型上的属性
// object是个函数对象, Object.__proto__ === Function.prototype,  Function.prototype.__proto__=== Object.prototype, 有objProp


console.log(Object.funcProp) // ?我是 Function 原型上的属性
// object是个函数对象, Object.__proto__ === Function.prototype,有funcProp


console.log(Function.objProp) // ?我是 Object 原型上的属性
// Function是个函数对象，Function.__proto__ === %Function.prototype，%Function.prototype.__proto__ === Object.prototype, 有objProp


console.log(Function.funcProp) // ?我是 Function 原型上的属性
// Function是个函数对向，Function.__proto__ === %Function.prototype,有funcProp

console.log(Array.objProp) // ?我是 Object 原型上的属性
// array是个函数对象，Array.__proto__ === Function.prototype，Function.prototype.__proto__=== Object.prototype, 有objProp

console.log(Array.funcProp) // ?我是 Function 原型上的属性
// // array是个函数对象，Array.__proto__ === Function.prototype，有funcProp
