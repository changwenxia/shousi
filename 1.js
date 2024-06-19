// 版本比较1
const comparseVersion = (sv1, sv2) => {
    const [cur, tur] = [sv1.split('.'), sv2.split('.')];
    const maxL = Math.max(cur.length, tur.length);
    let res = 0;

    Object.values(maxL).map(idx => {
        const [cItem, turItem]= [cur[idx] || 0, tur[idx] || 0];
        res = cItem > turItem ? 1 : -1;
    })
    return res;
}

// comparseVersion('1.0', '1.1');

// symbol独一无二的，即使值相同，也不相等(参考b和c)
// 使用Symbol.for(key)可以创造两个相等的symbol变量，使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。

// const [a, b, c, d, e, f] = [Symbol(), Symbol('con'), Symbol('con'), Symbol({age: 19}), Symbol.for('aa'), Symbol.for('aa')];
// console.log(a,b,c, d, e, f);
// console.log(b===c, e===f);

const privateFiled = Symbol();
class myClass {
    constructor() {
        this[privateFiled] = 'aabc';
    }
    getField() {
        return this[privateFiled];
    }
    setField(val) {
        this[privateFiled] = val;;
    }
}
const aa = new myClass();
// console.log(aa.getField());


const  a = {
    value: [1,2,3],
    valueOf: function(){
        return this.value.unshift()
    }
}
// console.log(a==1);



// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
// 输入：num1 = "11", num2 = "123"  输出："134"
// 解析：https://blog.csdn.net/qq_42999949/article/details/119514999
function addString(num1, num2) {
    if (num1 === '0') {
        return num2;
    }
    if (num2 === '0') {
        return num1;
    }

    let [l1, l2] = [num1.length -1, num2.length -1];
    let res = [];
    let carry = 0;
    while(l1 >= 0 || l2>=0 || carry > 0) {
        let n1 = l1 >= 0 ? num1.charAt(l1) - 0 : 0;
        let n2 = l2 >=0 ? num2.charAt(l2) - 0 : 0;

        let sum = n1 + n2 + carry;
        res.unshift(sum % 10);
        carry = Math.floor(sum / 10);
        l1--;
        l2--;
    }
    return res.join('');
}
// console.log(addString('46', '399'));

// 从上方 function Foo() 开始分析这一张经典之图
// function Foo(){};
// let f1 = new Foo();
// let f2 = new Foo();
// f1.__proto__ = Foo.prototype; // 准则2

// f2.__proto__ = Foo.prototype; // 准则2
// Foo.prototype.__proto__ = Object.prototype; // 准则2 (Foo.prototype本质也是普通对象，可适用准则2)
// Object.prototype.__proto__ = null; // 原型链到此停止
// Foo.prototype.constructor = Foo; // 准则1
// Foo.__proto__ = Function.prototype; // 准则2
// Function.prototype.__proto__  = Object.prototype; //  准则2 (Function.prototype本质也是普通对象，可适用准则2)
// Object.prototype.__proto__ = null; // 原型链到此停止
// // **此处注意Foo 和 Function的区别， Foo是 Function的实例**

// // 从中间 function Object()开始分析这一张经典之图
// function Object(){};
// let o1 = new  Object();
// let o2 = new  Object();

// o1.__proto__ = Object.prototype; // 准则2
// o2.__proto__ = Object.prototype; // 准则2
// Object.prototype.__proto__ = null; // 原型链到此停止
// Object.prototype.constructor = Object; // 准则1
// // 所有函数的__proto__  都和 Function.prototype指向同一个地方
// Object.__proto__ =  Function.prototype;// !!!准则2 (Object本质也是函数)；
// // 此处有点绕
// Function.prototype.__proto__ =  Object.prototype; // 准则2 (Function.prototype本质也是普通对象，可适用准则2)
// Object.prototype.__proto__ = null; // 原型链到此停止

// // 从下方 function Function()开始分析这一张经典之图
// function Function()
// Function.__proto__ = Function.prototype; // 准则2
// Function.prototype.constructor = Function; // 准则1







// console.log('1');

// setTimeout(function() {
//     console.log('2');
//     process.nextTick(function() {
//         console.log('3');
//     })
//     new Promise(function(resolve) {
//         console.log('4');
//         resolve();
//     }).then(function() {
//         console.log('5')
//     })
// })
// process.nextTick(function() {
//     console.log('6');
// })
// new Promise(function(resolve) {
//     console.log('7');
//     resolve();
// }).then(function() {
//     console.log('8')
// })

// setTimeout(function() {
//     console.log('9');
//     process.nextTick(function() {
//         console.log('10');
//     })
//     new Promise(function(resolve) {
//         console.log('11');
//         resolve();
//     }).then(function() {
//         console.log('12')
//     })
// })

// 1 7 6 8 2 4 3 5 9 11 10 12


Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
