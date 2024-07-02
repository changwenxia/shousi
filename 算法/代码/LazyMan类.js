// 实现一个LazyMan，可以按照以下方式调用：
// LazyMan('Hank')， 输出：Hi, This is Hank!
// LazyMan('Hank').sleep(5).eat('dinner')， 输出：
// Hi, This is Hank!
// 等待5秒
// Weak up after 10; Eat dinner~
// LazyMan('Hank').eat('dinner').eat('supper')， 输出:
//Hi, this is Hank!
//Eat dinner~
//Eat supper~
//LazyMan('Hank').sleepFirst(5).eat('supper')， 输出
// 等待5秒
// Wake up after 5
// Hi, this is Hank!
// Eat supper

//以此类推
// 题目解析
// 需要封装一个对象，并且这个对象提供不同的方法，比如eat
// 能进行链式调用，那么每个调用方法，都必须返回当前对象
// sleep、sleepFirst方法需要时异步的
// 解题思路
// 采用 ES6 的 class，来实现，封装对象_LazyMan
// 提供一系列方法，比如eat。sleep、sleepFirst异步方法采用Promise和setTimeout实现
// 链式调用，考虑到其中含异步方法，采用任务队列及 ES6 的async wait实现。每次调用都往队列中加入方法，然后循环调用任务队列，而循环中通过异步实现异步的方法，保证正确。
class lazyMan {
    constructor(name) {
        this.taskQuene = [];
        this.timer = null;
        this.sayHi(name);
    }

    run() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(async () => {
            for (let func of this.taskQuene) {
                await func();
            }
            this.taskQuene.length = 0;
            this.timer = null;
        });
        return this;
    }

    sayHi(name) {
        this.taskQuene.push(async () => {
            console.log(`hi, this is ${name}`);
        });
        return this.run();
    }
    eat(food) {
        this.taskQuene.push(async () => {
            console.log(`eat ${food}`);
        });
        return this.run();
    }
    sleep(second) {
        this.taskQuene.push(async () => {
            console.log(`Sleep ${second} s`);
            return this._timeout(second);
        });
        return this.run();
    }
    sleepFirst(second) {
        this.taskQuene.unshift(async () => {
            console.log(`Sleep first ${second} s`);
            return this._timeout(second);
        });
        return this.run();
    }

    async _timeout(second) {
        await new Promise((resolve) => {
            setTimeout(resolve, second * 1000);
        });
    }
}
let LazyMan = (name) => new lazyMan(name);
// LazyMan('Hank');
// LazyMan('Hank').sleep(5).eat('dinner');
// LazyMan('Hank').eat('dinner').eat('supper');
LazyMan("Hank").sleepFirst(5).eat("supper");
