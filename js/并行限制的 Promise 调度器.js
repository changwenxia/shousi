// 实现有并行限制的 Promise 调度器问题。一个任务并发控制器，要求每次都有两个任务在执行：
// 正常情况下，promise是没有并发数量限制的，同一个时间可以多个请求同时执行，然后谁返回的速度快，在前端页面直观的就可以打印谁的返回内容。
// 限制并发数量，假定并发数量最大是2。什么意思呢，就是我们上面例子中，执行任务的盒子，第一个addTask可以放进去，第二个也可以放进去，但第三个不可以立马放进去，因为最大并发数量是2，需要过1000ms，等第二个addTask执行完毕后，那此刻执行任务盒子里只有1个盒子，可以把第三个放进。。。。

class Scheduler {
    constructor() {
      this.queue = []; // 任务队列
      this.maxCount = 2; // 最大并行数
      this.runCounts = 0; // 跑了几个任务了
    }
    add(promiseCreator) {
      this.queue.push(promiseCreator);
    }
    taskStart() {
      for (let i = 0; i < this.maxCount; i++) {
        this.request();
      }
    }
    request() {
      if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
        return;
      }
      this.runCounts++;
      // 不同情况要改造
      this.queue
        .shift()()
        .then(() => {
          this.runCounts--; // 这里 this.queue.shift() 和 !this.queue || !this.queue.length 可以用这种办法
          this.request();
        });
    }
  }
  
  const timeout = time =>
    new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  
  const scheduler = new Scheduler();
  
  const addTask = (time, order) => {
    scheduler.add(() => {
      return timeout(time).then(() => {
        console.log(order);
      });
    });
  };
  addTask(1000, "1");
  addTask(500, "2");
  addTask(300, "3");
  addTask(400, "4");
  scheduler.taskStart();