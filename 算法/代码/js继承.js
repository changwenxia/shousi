// 1.原型链继承
// 缺点：1.所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）2.无法在不影响所有实例对象的情况下，给父类的构造函数传递参数。
// function Parent(name, gender) {
//     this.name = name;
//     this.gender = gender;
//     this.list = [1, 2, 3];
// }
// Parent.prototype.eat = function () {
//     console.log("晚餐时间到");
// };

// function Child(age) {
//     this.age = age;
// }
// Child.prototype = new Parent("李白", "男");
// let child = new Child(20);
// let child2 = new Child(30);
// child.eat();
// console.log(child.list, child2.list);
// child.list.push(4);
// console.log(child.list, child2.list);

// console.log(per1.age);// 10
// console.log(per1 instanceof Person); // true
// 2.构造函数继承，只能继承属性，不能继承方法
// function Parent(name) {
//     this.name = name;
// }
// Parent.prototype.saiHi = function () {
//     console.log("hello");
// };

// function Child(name, age, sex) {
//     Parent.call(this, name);
//     this.age = age;
//     this.sex = sex;
// }
// let child = new Child("aa", 18, "女");
// console.log(child.name);
// child.saiHi();//  Uncaught TypeError:child.sayHi is not a function
// 3. 组合继承
function Parent3() {
    this.name = "许风";
    this.age = 20;
    this.play = [4, 5, 6];
}
Parent3.prototype.print = () => console.log(123);

function Child3() {
    Parent3.call(this);
    this.address = "北京";
}
Child3.prototype = Object.create(Parent3.prototype);
Child3.prototype.constructor = Child3;

var s9 = new Child3();
var s10 = new Child3();
// s9.print();
// console.log(s9.name);

// console.log(Child3.prototype.constructor); //Child3
// console.log(s10.constructor); //Child3

// es6 extends super继承
class Animal {
    constructor(props) {
        this.name = props.name || "Unknown";
    }
    eat() {
        console.log(this.name + " will eat pests.");
    }
}
class Bird extends Animal {
    constructor(props, myAttribute) {
        super(props);
        this.type = props.type || "Unknown";
        this.attr = myAttribute;
    }
    fly() {
        console.log(this.name + " are friendly to people.");
    }
    myattr() {
        console.log(this.type + "---" + this.attr);
    }
}
var myBird = new Bird(
    {
        name: "",
        type: "Egg animal", //卵生动物
    },
    "Bird class"
);
myBird.eat();
myBird.fly();
myBird.myattr();
