// 三， 设计一个自由可灵活配置的时间调度器， 有a, b, c, d...
// 很多个需要被调度的方法（ 方法名称的命名可随意）， 调度有两种形式， 一个是顺序调用（ 例如调度完a后才能调度b）， 一个是间隔某个时间进行循环调度。 用一个统一的方法进行封装可以实现下列的例子：
// 1， 可以为5秒后调用a, 3 秒后调用b， 10 秒后调用。 c...z方法不执行（ 不执行的方法可以设计成不传递参数）， 那么在第14秒的时候开始重新从0秒循环， 又变成第一秒后调用a, 3 秒后调用b， 这样循环往复；
// 2， 每间隔6秒调用一次a, 每间隔4秒调用一次b， c...z方法不执行；
// 3， 第一秒先执行a， 3 秒后执行b， 但是c却是每间隔3秒执行一次， d是每间隔4秒执行一次， a和b是每4秒进行一次循环；
// 4， a不执行， b和c每间隔3秒执行一次， d不执行；
// https: //ideone.com/ 答题的同学答案都写到这个网站 写完了点一下 run就行，然后把url复制了发给我们便可。
  function TimeScheduler() {
    this.funcCallBack = [];
    this.add = function (fn, time) {
      let func = () => {
        setTimeout(() => {
          fn();
          this.next();
        }, time * 1000)
      }
      this.funcCallBack.push({
        func
      })
    }
    this.next = function () {
      let obj = this.funcCallBack.shift() || {};
      if (obj.func) {
        this.funcCallBack.push(obj);
        obj.func();
      }
    }
  }
  // let a = () => {
  //   console.log("a");
  // }
  // let b = () => {
  //   console.log("b");
  // }
  // let c = () => {
  //   console.log("c");
  // }
  // let d = () => {
  //   console.log("d");
  // }
  //1，可以为5秒后调用a,3秒后调用b，10秒后调用。c...z方法不执行（不执行的方法可以设计成不传递参数），那么在第14秒的时候开始重新从0秒循环，又变成第一秒后调用a,3秒后调用b，这样循环往复；
  // const timeScheduler1 = new TimeScheduler();
  // timeScheduler1.add(a, 5);
  // timeScheduler1.add(b, 3);
  // timeScheduler1.add(c, 10);
  // 2，每间隔6秒调用一次a,每间隔4秒调用一次b，c...z方法不执行；
  // timeScheduler1.add(b,4);
  // timeScheduler1.add(a,6);
  // 3，第一秒先执行a，3秒后执行b，但是c却是每间隔3秒执行一次，d是每间隔4秒执行一次，a和b是每4秒进行一次循环；
  // timeScheduler1.add(a, 1);
  // timeScheduler1.add(b, 3);
  // timeScheduler1.add(c, 3);
  // timeScheduler1.add(d, 4);
  // 4，a不执行，b和c每间隔3秒执行一次，d不执行；
  // timeScheduler1.add(b,3);
  // timeScheduler1.add(c,3);

  // timeScheduler1.next();
  function work() {}
  

  function DayLife() {
    this.funcs = [];
    this.dothing = function(fn,time){
      const func = ()=>{
        setTimeout(()=>{
          fn();
          this.next();
        },(time-8)*1000)
      }
      this.funcs.push({func})
    }
    this.next = function () {
      let obj = this.funcs.shift() || {};
      if (obj.func) {
        this.funcs.push(obj);
        obj.func();
      }
    }
  }
  const a = ()=> { console.log("起床");}
  const b = ()=> { console.log("刷牙");}
  const c = ()=> { console.log("上班");}
  const d = ()=> { console.log("下班");}
  const e = ()=> { console.log("睡觉");}
  const dayLife = new DayLife();
  async function thing(){
    dayLife.dothing(a, 8);
    dayLife.dothing(b, 9);
    dayLife.dothing(c, 10);
    dayLife.dothing(d, 17);
    dayLife.dothing(e, 22);
    dayLife.next();
  }
  thing()