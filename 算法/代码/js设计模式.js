// 单例模式
function Person() {}

function singleton() {
    let instance;
    if (!instance) {
        instance = new Person();
    }
    return instance; // 返回永远都是第一次new Person实例 永远是一个实例
}

const p1 = singleton();
const p2 = singleton();
console.log(p1 === p2); // false

// js组合模式
class GetHome {
    init() {
        console.log("到家了");
    }
}
class OpenComputer {
    init() {
        console.log("打开电脑");
    }
}
class PlayGame {
    init() {
        console.log("玩游戏");
    }
}
//上面实例化对象的启动方式都一致,把这几个函数以组合模式的情况书写然后统一启动
class Compose {
    constructor() {
        this.compose = [];
    }
    // 添加任务的方法
    add(task) {
        this.compose.push(task);
    }
    // 一个执行任务的方法
    execute() {
        this.compose.forEach((item) => {
            item.init();
        });
    }
}
const c = new Compose();
// 把所有要完成的任务都放在队列里面
c.add(new GetHome());
c.add(new OpenComputer());
c.add(new PlayGame());
// 直接器动任务队列  // 就会按照顺序执行三个对象中的 init 函数
c.execute();
