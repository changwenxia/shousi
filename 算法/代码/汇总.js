// Promise.all 需要等到所有的 promise 的状态都变成 fulfilled 之后才 resolve, 但只要有一个 promise 失败即返回失败的结果。
// function PromiseAll(promise) {
//     return new Promise((resolve, reject) => {
//         let index =0; res = [];
//         if (promise.length === 0) {
//             resolve(res);
//         }
//         promise.map((item, i) => {
//             Promise.resolve(item).then(data => {
//                 res[i] = data;
//                 if (++index === promise.length) {
//                     resolve(res);
//                 }
//             }, err => {
//                 reject(err)
//             })
//         })
//     })
//   }
//   let p1 = new Promise((resolve) => {
//     resolve('成功了')
//   })
//   let p2 = new Promise((resolve) => {
//     resolve('success')
//   })
//   PromiseAll([p1, p2]).then((result) => {
//     console.log(result) //['成功了', 'success']
//   }).catch((error) => {
//     console.log(error)
//   });

// 不使用类似for，while循环控制语句和js本身自带方法（如：forEach）的情况下，
//   // 实现将一个空数组[]赋值成[0,2,4,6,8,10,...,100]，范围0-100便可。
//   let arr = [];

//   function addNumber(min, max) {
//     if (min <= max) {
//       arr.push(min);
//       min += 2;
//       addNumber(min, max)
//     }
//   }
//   addNumber(0, 100);

  
// 查找字符串中的最长公共前缀
// 示例: 输入: [“flower”,“flow”,“flight”]
// 输出: “fl”
// 思路：先取到数组第一个元素的值，将后面每个元素的字符和第一个元素的值做比较，如果不一样返回结果，一样的话，将相同的字符拼接到result
// function findMaxAndInd(arr) {
//     let res = '', firstStr = arr[0];
//     if (!arr.length) return res;

//     for(let i = 0; i < firstStr.length; i++) {
//         for(let j = 1; j < arr.length; j++) {
//             if (firstStr[i] !== arr[j][i]) {
//                 return res;
//             }
//         }
//         res += firstStr[i];
//     }
//     return res;
// }

// console.log(findMaxAndInd(["flower", "flow", "flight"]));


// 递归将数字翻转
// function revertNumber(a) {
//     let num1 = a/10;
//     let num2 = a%10;
//     console.log(a, num1, num2);

//     if (num1 < 1) {
//         return a;
//     }
//     num1 = Math.floor(num1);
//     return `${num2}${revertNumber(num1)}`;
// }

// let a = revertNumber(1234);
// console.log(a, typeof a);

// 栈 先入后出 后入先出
// function createStack(data) {
//     if (!Array.isArray(data)) {
//         return console.error('params must be Array');
//     }
//     this.data = data;
//     this.length = data.length;
//     this.add = item => {
//         this.data.push(item);
//         this.length++;
//     }
//     this.get = () => this.data.pop();
// }

// let stack = new createStack([1,2,4,5]);
// stack.add(3);
// // console.log();
// for(let i=0;i< stack.length; i++){
//   console.log("=====",stack.get());
// }

//二叉树查找
let tree = {
    id: 1,
    left: {
        id: 2,
        left: {id: 4},
        right: {id: 5},
    },
    right: {
        id: 3,
        left: {id: 6},
        right: {id: 7},
    }
}
// 1.根左右 前序递归 1245367
// function rootLR(tree) {
//     console.log('====', tree.id);
//     if (tree.left) rootLR(tree.left);
//     if (tree.right) rootLR(tree.right);
// }
// rootLR(tree);
// 2.左根右 中序遍历 4251637
// function LRootR(tree) {
//     if (tree.left) LRootR(tree.left);
//     console.log('====', tree.id);
//     if (tree.right) LRootR(tree.right);
// };
// LRootR(tree);
//3.左右跟 后续遍历  4526731
// function LRRoot(tree){
//     if (tree.left) LRRoot(tree.left);
//     if (tree.right) LRRoot(tree.right);
//     console.log('-----', tree.id);
// }
// LRRoot(tree)
// 4 根左右 前序非递归 1245367
// function w_rootR(tree) {
//     // 定义一个栈
//     let res = [],
//       arr = [tree]
//     while (arr.length) {
//       let tmp = arr.pop();
//       res.push(tmp.id);
//       // 栈先入后出，所以需要先入右子树才能保证先出左子树
//       if (tmp.right) arr.push(tmp.right)
//       if (tmp.left) arr.push(tmp.left)
//     }
//     return res
//   }
//5 左根右 中序非递归 4251637
// function w_LRootR(root) {
//     if (!root) return;
//     const stack = [],res = [];
//     let p = root; // 定义一个指针
//     // 如果指针有数据或者p不是null，则继续遍历
//     while(stack.length || p) {
//         // 如果p存在则将p入栈并移动指针
//         while (p) {
//             stack.push(p);
//             p = p.left;
//         }
//         const node = stack.pop();
//         res.push(node.id);
//         p = node.right;
//     }
//     return res;
// }
// 6 左右跟 后序非递归遍历 4526731
// function w_LRRoot(tree) {
//     let arr = [tree], res = [];
//     while(arr.length) {
//         let tmp = arr.pop();
//         res.push(tmp.id);
//         console.log(1, arr, tmp, res);

//         if (tmp.left) arr.push(tmp.left); 
//         if (tmp.right) arr.push(tmp.right); 
//     }
//     return res.reverse();
// }

function w_LRRoot(root) {
    if (!root) return;
    const res = [], outputStack = [];
    const stack = [root];
    while(stack.length) {
        const node = stack.pop();
        outputStack.push(node);
        // 这里先入left需保证left后出，在stack中后出，就是在outputStack中先出
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
    }
    while (outputStack.length) {
        const node = outputStack.pop();
        res.push(node.id);
    }
    return res;
}
// w_LRRoot(tree)
// console.log(w_LRRoot(tree));

// const tree ={
//     value: 'a',
//     children: [
//         {
//             value: 'b',
//             children: [
//                 {value: 'e', children: null},
//                 {value: 'f', children: null},
//             ]
//         },
//         {
//             value: 'c',
//             children: [
//                 {value: 'g', children: null},
//             ]
//         },
//         {
//             value: 'd',
//             children: [
//                 {value: 'h', children: null},
//                 {value: 'i', children: null},
//             ]
//         },
//     ],
// };
// let arr = [];

// const dfs = (root) => {
//     arr.push(root.value)
//     root.children && root.children.forEach(dfs);
// }

// const bfs = root => {
//     const q = [root];
//     while(q.length > 0) {
//         const node = q.shift();
//         arr.push(node.value);
//         node.children && node.children.forEach(child => q.push(child))
//     }
// }
// bfs(tree)
// console.log(arr);

// let tree = {
//     val: 'a',
//     left: {
//         val: 'b',
//         left: {val: 'd'},
//         right: {val: 'e'},
//     },
//     right: {
//         val: 'c',
//         left: {
//             val: 'f',
//             left: {val: 'h'},
//             right: {val: 'i'},
//         },
//         right: {val: 'g'},
//     }
// }
// console.log(w_LRootR(tree)); 
// let arr = [];
// 二叉树的深度优先遍历与树的深度优先遍历思路一致，思路如下：
// 访问根节点；
// 访问根节点的left
// 访问根节点的right
// 重复执行第二三步
const dfs = root => {
    if (!root) return;
    arr.push(root.val);
    root.left && dfs(root.left);
    root.right && dfs(root.right);
}

// 广度优先遍历
// 实现思路如下：

// 创建队列，把根节点入队
// 把对头出队并访问
// 把队头的left和right依次入队
// 重复执行2、3步，直到队列为空
const bfs = root => {
    if (!root) return;
    const queue = [root];
    while(queue.length) {
        let node = queue.shift();
        arr.push(node.val);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
}
// bfs(tree);
// console.log(arr);
// const root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4;
// console.log(lowestCommonAncestor(root, p, q))
// 防抖
function debouce(fn, time) {
    let timer = null;
    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,arguments);
        }, time);
    }
}
// 节流
function throttle(fn, time) {
    let canRun = true;
    return () => {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, time)
    }
}
 // 函数柯里化
function sort1(name, arr) {
     return (prev, next) => {
        return arr.indexOf(prev[name]) - arr.indexOf(next[name])
     }
}
const arr = [33, 11, 55, 22, 66]
    const obj = [{
      age: 55,
      money: 6000
    }, {
      age: 22,
      money: 3000
    }, {
      age: 11,
      money: 2000
    }, {
      age: 66,
      money: 9000
    }, {
      age: 33,
      money: 5000
    }]
    obj.sort(sort1("age", arr))
    // console.log(obj);


    function add(...args) {
        let allArgs = [...args];
        function fn(...newArgs) {
          allArgs = [...allArgs, ...newArgs];
          return fn;
        }
        fn.toString = function () {
          if (!allArgs.length) {
            return;
          }
          return allArgs.reduce((sum, cur) => sum + cur);
        };
        return fn;
      }
    
    // console.log(add(1)(2)(3));

// 阶乘 阶乘通常简写成 n! 5! = 1 * 2 * 3 * 4 * 5 = 120
function factorialize(num) {
    let res = 1;
    for(let i =num;i>0;i--) {
        res *= i;
    }
    return res;
}
// console.log(factorialize(5));

// 设置一个长度是m，内容都是n得数组
function setArr(m, n) {
    // 写法1
    // return new Array(m).fill(n);
    // 写法2
    const arr = [];
    function add(m, n) {
        if (arr.length === m) return arr;
        arr.push(n);
        add(m, n);
    }

    add(m, n);
    return arr;
}
// console.log(setArr(3, 2));

// null和undefined区别
let a;
let b = () => {
    console.log(a, typeof a, a=== null);
    if (a !== null || typeof a !== "undefined") {
        console.log('true');
        return;
    }
    console.log('false');
}
// b();

// 截断字符串（用瑞兹来截断对面的退路）
//如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。
//切记，插入到字符串尾部的三个点号也会计入字符串的长度。
// 但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度
function truncate(str, num) {
    let res = '';
    if (str.length <= num) {
        res = str;
    } else {
        res = num > 3 ? str.slice(0, num - 3) + '...' : str.slice(0, num) + '...';
    }
    return res;
}
truncate("A-tisket a-tasket A green and yellow basket", 11);

// 猴子吃香蕉可是掰成好几段来吃哦！
//把一个数组arr按照指定的数组大小size分割成若干个数组块。
// 例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];
// chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];
function chunk(arr, num) {
    let res = [];
    for(let i = 0; i< arr.length; i += num) {
        let arr2 = arr;
        res.push(arr2.slice(i, i+num))
    };
    return res;
}
chunk([1,2,3,4,5],3);

//比较字符串（蛤蟆可以吃队友，也可以吃对手）  如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。
// 举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。
// ["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。
// ["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。
function mutation(arr) {
    let str1 = arr[0].toLowerCase();
    let str2 = arr[1].toLowerCase();
    for(let i= 0; i< str2.length; i++) {
        if (str1.indexOf(str2[i]) < 0) {
            return false;
        }
    }
    return true;
}
// console.log(mutation(["Alien", "line"]));

// 真假美猴王！删除数组中的所有假值。
// 在JavaScript中，假值有false、null、0、""、undefined 和NaN。
// bouncer([7, "ate", "", false, 9]) 应该返回 [7, "ate", 9].
// bouncer(["a", "b", "c"])应该返回 ["a", "b", "c"].
// bouncer([false, null, 0, NaN, undefined, ""]) 应该返回 [].
// bouncer([1, null, NaN, 2, undefined]) 应该返回 [1, 2].
function bouncer(arr) {
    return arr.filter(val => {
      return Boolean(val)
    })
}
// console.log(bouncer([1, null, NaN, 2, undefined]));

// 金克斯的迫击炮！实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。
// destroyer([1, 2, 3, 1, 2, 3], 2, 3) 应该返回 [1, 1].
// destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3) 应该返回 [1, 5, 1].
// destroyer([3, 5, 1, 2, 2], 2, 3, 5) 应该返回 [1].
// destroyer([2, 3, 2, 3], 2, 3) 应该返回 [].
// destroyer(["tree", "hamburger", 53], "tree", 53) 应该返回["hamburger"].
function destroyer(arr) {
    return arr.filter(val => {
        for(let i = 1; i< arguments.length; i++) {
            if (arguments[i] === val) return false;
        }
        return true;
    })
}
// console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
// console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3));
// console.log(destroyer([3, 5, 1, 2, 2], 2, 3, 5));
// console.log(destroyer([2, 3, 2, 3], 2, 3));
// console.log(destroyer(["tree", "hamburger", 53], "tree", 53));

// 先给数组排序，然后找到指定的值在数组的位置，最后返回位置对应的索引。
// 举例：where([1,2,3,4], 1.5) 应该返回1。因为1.5插入到数组[1,2,3,4]后变成[1,1.5,2,3,4]，而1.5对应的索引值就是1。
// 同理，where([20,3,5], 19) 应该返回 2。因为数组会先排序为 [3,5,20]，19插入到数组[3,5,20]后变成[3,5,19,20]，而19对应的索引值就是2。
function where(arr, num) {
    arr.sort((a, b) => a - b);
    for(let i =0 ;i<arr.length;i++) {
        if (arr[i] >= num) return i;
    }
}
// console.log(where([20,3,5], 19));

//移位密码也就是密码中的字母会按照指定的数量来做移位。一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔ 'O'，以此类推。

// 写一个ROT13函数，实现输入加密字符串，输出解密字符串。
// 所有的字母都大写，不要转化任何非字母形式的字符(例如：空格，标点符号)，遇到这些特殊字符，跳过它们。
// rot13("SERR PBQR PNZC") 应该解码为 "FREE CODE CAMP"
// rot13("SERR CVMMN!") 应该解码为 "FREE PIZZA!"
// rot13("SERR YBIR?") 应该解码为 "FREE LOVE?"
// rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.") 应该解码为 "THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX."
// String.fromCharCode() 静态方法返回由指定的 UTF-16 码元序列创建的字符串。
// 思路：
// 1、26个字母的unicode码在65(A)与90(Z)之间,第13位M(77);
// 2、将str通过.charCodeAt()转为unicode编码并放入新数组;
//   其中非字母形式的字符直接放入.charAt();
//   后13位字母减去13后放入；
//   前13位字母加上13后放入；
//   通过.fromCharCode()转化为字母，将数组转化为字符串；
function rot13(str) {
    let arr = [];
    for(let i = 0 ;i<str.length;i++) {
        if (str.charCodeAt(i) < 65 || str.charCodeAt(i) > 90) {
            arr.push(str[i]);
        } else if (str.charCodeAt(i)  > 77) {
            arr.push(String.fromCharCode(str.charCodeAt(i) - 13));
        } else {
            arr.push(String.fromCharCode(str.charCodeAt(i) + 13));
        }
    } 
    return arr.join('')
}
// console.log(rot13("SERR PBQR PNZC"));

// function rot132(str) {
//     return str.replace(/[a-zA-Z]/g, (c) => {
//       const shift = (c.charCodeAt(0) - 65 + 13) % 26; // 假设A的ASCII码是65
//       return String.fromCharCode((c.toUpperCase() === c ? 'A' : 'a').charCodeAt(0) + shift);
//     });
//   }
  
  // 使用示例
//   console.log(rot132("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK."));

// 已知如下数组：
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

function sortArr(arr) {
    return Array.from(new Set(arr.flat(Infinity).sort((a, b) => a-b)));
}
// console.log(sortArr([ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]));

// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。

function uniqueArr(arr1, arr2) {
    return [...arr1, ...arr2].sort((a, b) => a.charCodeAt() - b.charCodeAt());
}
// const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'],
//   arr2 = ['A', 'B', 'C', 'D']
// console.log(uniqueArr(arr1, arr2));


// function Foo() {
//     getName = function () {  console.log(1); };
//     return this;
// }
// Foo.getName = function () {  console.log(2); };
// Foo.prototype.getName = function () {  console.log(3); };
// var getName = function () {  console.log(4);  };

// function getName() {  console.log(5); }

//请写出以下输出结果：
// Foo.getName(); // 2
// getName();     //  4
// Foo().getName();  // 1
// getName();   // 1
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3

// 判断是否是回文
// 首先将输入字符串转换为小写，并移除所有非字母数字的字符。然后，它通过调用split()、reverse()和join()方法来反转字符串，并将反转后的字符串与原始字符串进行比较。如果两者相等，则字符串是回文；否则不是。

function palindrome(str) {
    // 将字符串转为小写，并移除非字母数字的字符
    str = str.toLowerCase().replace(/[^0-9a-z]/g, '');
    // 写法1
    let strReverse = str.split('').reverse().join('')
    return str == strReverse

    // 写法2
    // const length = str.length;
    // if(length == 0 || length == 1) return true
    // // console.log(str === str.split('').reverse().join(''));
    // if(str.charAt(0) != str.charAt(length-1)){
    //     return false
    // }else{
    //     return palindrome(str.substring(1, length-1))
    // }
    // 写法3
    // let len = str.length
    // for(let i = 0, j = len-1; i <= j; i++,j--){
    //     if(str[i] != str[j]){
    //         return false
    //     }
    // }
    // return true

}
// console.log(palindrome("eye"));  // 应该返回一个布尔值
// console.log(palindrome("eye") ); // 应该返回 true.
// console.log(palindrome("race car") ); // 应该返回 true.
// console.log(palindrome("not a palindrome") ); // 应该返回 false.

// 裴波那切数列定义：1、1、2、3、5、8、13、21、34....裴波那切定义 f(1) = 1;f(2) = 1; f(n) = f(n-1)+f(n-2);随着数项数增加前一位和后一位数的比例越来越接近黄金比列。0.618

// 方法1 递归 缺点：参数n增大时出现浏览器假死现象 n
function fbl1(n) {
    if (n <= 2) return 1;
    return fbl1(n - 1) + fbl1(n - 2);
}

// 方法2 尾调用优化
function fbl2(n, res1 = 1, res2 = 2) {
    if (n <=2) return res1;
    return fbl2(n-1, res2, res1+ res2);
}

// 方法3 迭代
function fbl3(n) {
    let res1 = 1, res2 = 1, sum = res2;
    for(i=2; i<n;i++) {
        sum = res1 + res2;
        res1 = res2;
        res2 = sum;
    }
    return sum;
}
// console.log(fbl1(6), fbl2(6),fbl3(6), fbl4(6))

// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值，返回 [-1, -1]。
// 示例
// nums = [5,7,7,8,8,10], target = 8 输出: [3,4]
// nums = [5,7,7,8,8,10], target = 6 输出: [-1,-1]

// 思路：1. 开始位置 indexOf
//      2. 结束位置：翻转数组，求arr.length-(indexOf+1)

function pop(arr, target) {
    const tmp = [];
        tmp[0] = arr.indexOf(target);
        tmp[1] = arr.reverse().indexOf(target);
    if (tmp[1] !== -1) {
        tmp[1] = arr.length - tmp[1] - 1;
    }
    // console.log(tmp[0], tmp[1]);
    return tmp;
}
const nums = [5,7,7,8,8,10];
const target = 6;
pop(nums, target);

// 深拷贝
// 思路：从第一层开始获取key,并判断值类型，设置新的临时值，如果是数组和对象则递归执行

function deepClone(obj) {
    let cloneObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for(let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    cloneObj[key] = deepClone(obj[key]);
                } else {
                    cloneObj[key] = obj[key];
                }
            }
        }
    }
    return cloneObj;
}
// let a1 = [20,8,6,19],
// b1 = deepClone(a1);
// a1[1] = 2;
// console.log(a1, b1);

// 手写bind
Function.prototype.mybind = function (context, ...bindments) {
    cotext = context || window;
    const func = this;
    return function F(...callments) {
        let args = bindments.concat(callments);
        if (this instanceof F) return new func(...args);
        return func.call(context, ...args);
    }
}
// function one(a, b) {
//     this.a = a;
//     this.b = b;
//     console.log(this)
// }
// let obj1 = {
//     name: 'yiyi'
// }
// let child = one.mybind(obj1, 2);
// child(3);
// 手写call
Function.prototype.myCall = function(context, ...args) {
    context = context || window;
    context.func = this;
    if (typeof context.func !== 'function') {
        throw new TypeError('必须是函数调用call');
    }
    let res = context.func(...args);
    delete context.func;
    return res;
}
// 手写apply
Function.prototype.myApply = function(context, arr) {
    context = context || window;
    context.func = this;
    if (typeof context.func !== 'function') {
        throw new TypeError('必须是函数调用call');
    }
    let res = context.func(...arr);
    delete context.func;
    return res;
}
var foo = {
    name: "Selina",
};
var name = "Chirs";

function bar(job, age) {
    console.log(this.name);
    console.log(job, age);
}
// bar.myApply(foo, ["programmer", 20]);

// 父子通信 eventEmitter
class EventEmitter{
    constructor() {
        this.events = {}
    }
    on(name, fn) {
        if (!this.events[name]) {
            this.events[name] = []
        }
        this.events[name].push(fn);
    }
    emit(name, ...rest) {
        this.events[name] && this.events[name].forEach(fn => fn.apply(name, rest))
    }
    remove(name, fn) {
        if (this.events[name]){
            this.events[name].filter(f => f !== fn);
        }
    }
    once(name, fn) {
        const cb = () => {
            fn();
            this.remove(name, cb)
        }
        this.on(name, cb);
    }
}

// const event = new EventEmitter();
// const handle = (...params) => console.log(params);
// event.on('click', handle);
// event.emit('click', 100,200,300,400);
// event.remove('click', handle);
// event.once('dbclick', function() {
//     console.log('dbclick');
// })
// event.emit('dbclick', 100);

// 手写promise
function SimplePromise(excutor) {
    let _this = this;
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    excutor(resolve, reject);

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.state = 'resolved';
            _this.value = value;
            _this.onFulfilledCallbacks.forEach(fn => fn(value));
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.state = 'rejected';
            _this.reason = reason;
            _this.onRejectedCallbacks.forEach(fn => fn(reason));
        }
    }
}
SimplePromise.prototype.then = function(onFullfilled, onRejected) {
    let promise1 = new SimplePromise((resolve, rejected) => {
        if (this.state === 'resolved') {
            onFullfilled(this.value);
        }
        if (this.state === 'rejected') {
            onRejected(this.reason);
        }
        if (this.state === 'pending') {
            this.onFulfilledCallbacks.push(onFullfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
    })
    return promise1;
}
 /**
 * 解析then返回值与新Promise对象
 * @param {Object} promise2 新的Promise对象 
 * @param {*} x 上一个then的返回值
 * @param {Function} resolve promise2的resolve
 * @param {Function} reject promise2的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('promise发生率循环引用'));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        //可能是个对象或是函数
        setTimeout(() => {
            try {
                let then = x.then;
                if (typeof then === 'function') {
                     //then是function，那么执行Promise
                    let y = then.call(x, (y) => {
                        resolvePromise(promise2, y, resolve, reject)
                    }, r => {
                        reject(r)
                    })
                } else {
                    resolve(x);
                }
            } catch (error) {
                reject(err);
            }
        }, 0)
    } else {
        resolve(x)
    }
}

SimplePromise.defer = SimplePromise.deferred = function () {
    let dfd = {}
    dfd.promise = new SimplePromise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
// const myPromise = new SimplePromise((resolve, reject) => {
//     // 异步操作
//     setTimeout(() => {
//       // 成功时调用resolve
//       resolve('操作成功');
   
//       // 失败时调用reject
//       // reject('操作失败');
//     }, 1000);
// });
   
// myPromise.then(
//     (value) => console.log('成功:', value),
//     (reason) => console.error('失败:', reason)
// );

// 翻书问题或者走台阶问题。
  // 问：共有n个台阶，每次只能上1个台阶或者2个台阶，共有多少种方法爬完台阶？共有n页书，每次只能翻1页或者2页书，共有多少种方法翻完全书？
  // ps：本质上是斐波那契数列问题。假设只有一个台阶，则只有一种跳法，f(1)=1；如果两个台阶，那么有两种跳法：1,一次跳一级，2,一次跳两级，f(2) = 2。如果大于2的n级台阶，那么一次跳一级台阶，剩下还有n-1级台阶，有f(n-1)种跳法。假如一次跳2级台阶，剩下n-2级台阶，有f(n-2)中跳法。这就表示f(n) = f(n-1)+f(n-2)。
  function fibonacci(n) {
    if (n === 1 || n === 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
// 一个记忆化的斐波那契数列
let tem = [0, 1];
function fibonacci1(n) {
    let res = tem[n];
    if (typeof res !== 'number') {
        res = fibonacci1(n -1) + fibonacci1(n - 2);
        tem[n] = res; // 将每次 fibonacci(n) 的值都缓存下来
    }
    return res;
}
// 贪心算法--最少硬币找零问题
// 所谓贪心，就是先选择当前阶段的最优解，不去考虑这次的选择会不会对未来造成影响，想要通过每个阶段的局部最优解，达到全局最优解。
// 假设你为一家自动售货机厂家编程序，自动售货机要每次找给顾客最少数量硬币，美国有以下面额的硬币：1美分、5美分、10美分、25美分。比如说要找36美分的零钱，我们可以用1个25美分、1个10美分和一个1美分。 (ps：找零问题，先找大额的硬币25分，依次递减)
function minCoinChange(amount, coins) {
    let change = [], total = 0;
    for(let i = 0; i< coins.length; i++) {
        const coin = coins[i];
        while(coin + total <= amount) {
            change.push(coin);
            total += coin;
        }
    }
    return change;
}
let counts = minCoinChange(36, [25, 10, 5, 1])
// console.log(counts)

// 某公司 1 到 12 月份的销售额存在一个对象里面
  // 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：
  // [222, 123, null, null, 888, null, null, null, null, null, null, null]。
// let obj1 = {1:222, 2:123, 5:888};
// console.log(Array.from({length: 12}, (val, key) => obj1[key + 1] || null));

//实现一个 sleep 函数
//比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现
// promise
const sleep1 = time => {
    return new Promise(resolve => setTimeout(resolve, time));
}
// sleep1(3000).then(() => console.log(1));
// Generator
function* sleepGenerator(time) {
    yield new Promise(resolve => setTimeout(resolve, time));
}
// sleepGenerator(3000).next().value.then(() => console.log(1))
// async
// const sleep = time => {
//     return new Promise(resolve => setTimeout(resolve, time)); 
// }
// async function putput() {
//     let out = await sleep(1000);
//     console.log(1);
//     return out;
// }
// putput();
// es5
function sleep(func, time) {
    if (typeof func === 'function')  {
        setTimeout(func, time)
    }
}
function output() {
    console.log(1);
}
// sleep(output, 1000);

// -----------数组排序------------
// 冒泡排序
// 思路：冒泡排序法的运行机制是通过循环遍历元素，并调整相邻元素顺序的一种简单排序方法。
// 它重复地走访要排序的元素列，依次比较两个相邻的元素，如果他们的顺序（如从大到小、首字母从A到Z）错误就把他们位置交换过来.
function bubbleSort(arr) {
    for(let i =0 ;i<arr.length - 1;i++) {
        for(let j =0; j<arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr;
}
// 改良版 每次最大值放到最右后，会将本轮最后一个操作的位置作为下一轮的终点，可以减少有些不必要的冒泡
function bubbleSort(arr) {
    let i = arr.length - 1;
    while(i > 0) {
        let pos = 0;
        for(let j = 0; j< i; j++) {
            pos = j;
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        i = pos;
    }
    return arr;
}
// 2 快速排序
// 思路：选择一个元素作为基数（通常是第一个元素），把比基数小的元素放到它左边，比基数大的元素放到它右边（相当于二分），再不断递归基数左右两边的序列。
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let leftArr = [], rightArr =[];
    for(let i=1; i< arr.length; i++) {
        if (arr[i] < arr[0]) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i])
        }
    }
    return [].concat(quickSort(leftArr), arr[0], quickSort(rightArr));
}
// 3.插入排序
// 依然要通过两层循环，外循环便利每个数组项，内循环从外循环的数组项（i）开始往前遍历，如果当前数组项比前一个小，则与前一个调换位置，这样一直循环重复，数组就逐渐归位了；
function insertSort(arr) {
    for(let i=1;i<arr.length;i++) {
        for(let j =i;j>0;j--) {
            if (arr[j] < arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j -1], arr[j]];
            }
        }
         // 优化
        // 接下来要改进插入排序，减少数组项调换复制操作，替代为单向复制，在内循环中不再是比前一位小就调换，而是先将 j（当前项） 的值取出，将 j-1 的值复制进目前的 j 项中，先不改变 j-1 的值，然后再拿当前项去跟 j-2 比，如果当前项还是更小，则重复之前操作，直到正确位置，再将当前项的值复制进去，这样就成功减少了近一半的赋值操作了；（代码下图②）
        // let curNum = arr[i];
        // let rightIndex = i;
        // for (let j = i; j>0 && curNum < arr[j-1]; j--) {
        //     arr[j] = arr[j-1];
        //     rightindex = j-1;
        // }
        // arr[rightIndex] = curNum;
    }
    return arr;
}
// 4 选择排序
// 思路：和冒泡排序类似，区别在于选择排序是将每一个元素和它后面的元素进行比较和交换
function selectSort(arr) {
    for(let i=0;i<arr.length;i++) {
        for(let j=i+1;j<arr.length;j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]] 
            }
        }
    }
    return arr;
}
// 5.希尔排序
// 思路：希尔排序将插入排序作为它的子进程，它的核心是一个叫步长(gap)的概念，这个步长可以理解为一个类似疏密程度的概念。它共有3层循环，外层是以步长为循环，一般取数组的一半，循环一次再除一半，中层和里层就是插入排序的操作，不过不是跟前一项比，是跟当前索引减去步长后的那一项比。说到这里就可以理解为什么我说步长是类似疏密程度的概念，当步长不断除于2，变得越来越小，直到零停止循环，这个过程中，插入排序的比较项间越来越近，逐渐数组被排列出来。
function shellSort(arr) {
    let gap = Math.floor(arr.length / 2);
    while(gap > 0) {
        for(let i=gap;i<arr.length;i++) {
            for(let j = i; j > 0; j-=gap) {
                if (arr[j] < arr[j - gap]) {
                    [arr[j], arr[j-gap]] = [arr[j-gap], arr[j]] 
                }
            }
        }
        gap = Math.floor(gap/2)
    }
    return arr;
}

// 6.桶排序
// 取 n 个桶，根据数组的最大值和最小值确认每个桶存放的数的区间，将数组元素插入到相应的桶里，最后再合并各个桶。
function bucketSort(arr) {
    let data = Array.from({length: 10}).fill(0);
    let newArr = [];
    arr.forEach(el => {
        data[el] !== 'undefined' ? data[el]++ : data[el] = 1;
    });

    for(let i=0;i<data.length;i++) {
        for(let j=0;j<data[i];j++) {
            newArr.push(i);
        }
    }
    return newArr;
}
// let arr1 = [8, 3, 5, 9, 2, 3, 0, 8]
// console.log(bucketSort(arr1));
// 数组去重
function removeDup(arr) {
    let res = [], hasMap = {};
    for(let i=0;i<arr.length;i++) {
        if (!hasMap[arr[i]]) {
            hasMap[arr[i]] = true;
            res.push(arr[i])
        }
    }
    return res;
}
// let arr12 = [1, 2, 6, 6, 45, 56, 45, 3]
// console.log(Array.from(new Set(arr)));
// console.log([...new Set(arr)]);
// 判断数组中哪几个数相加等于9 
let twoSum = function(nums, target) {
    const map = new Map();
    for(let i =0;i<nums.length;i++) {
        const res = target - nums[i];
        if (map.has(res)) {
            return [map.get(res), nums[i]]
        } else {
            map.set(nums[i], nums[i])
        }
    }
}
// console.log(twoSum([2, 7, 11, 15],9)); 
// 数组flat
//数组flat方法是ES6新增的一个特性，可以将多维数组展平为低维数组。如果不传参默认展平一层，传参可以规定展平的层级。
function flat(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flat(arr[i]))
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}
// 使用递归优化flat
const flatArr = [];
function optimizeFlat(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            optimizeFlat(arr[i]);
        } else {
            flatArr.push(arr[i]);
        }
    }
}

function flattenByDeep(arr, deep) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && deep >= 1) {
            res = res.concat(flattenByDeep(arr[i], deep - 1));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}
const arr123 = [1, [4, 5, [6, 7]]];
// optimizeFlat(arr123)
// console.log(flattenByDeep(arr123, 3));
//// 实现 (5).add(3).minus(2) =6 功能
Number.prototype.add = function(num) {
    if (typeof num !== 'number') throw new Error('请输入数字');
    return this.valueOf() + num;
}
Number.prototype.minus = function(num) {
    if (typeof num !== 'number') throw new Error('请输入数字');
    return this.valueOf() - num;
}
// console.log( (5).add(3).minus(2));

// 写一个js线程占满让浏览器崩溃的程序
// let aa = 1;
// setTimeout(function(a){
//     alert(a);
// },100)
// while(aa){
//     aa=2;
// };

// 找出数组中最大的数
function findLargestOfArr(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(Math.max(...arr[i]));
    }
    // return newArr;
    console.log(newArr);
}
// findLargestOfArr([
//   [4, 5, 1, 3],
//   [13, 27, 18, 26],
//   [32, 35, 37, 39],
//   [1000, 1001, 857, 1]
// ]);

// 找出最长单词，返回单词和长度
function findLongestWord(str) {
    let words = str.split(/\s+/),
        longestWord = '', maxLength = [];
    words.forEach(word => {
        if (word.length > maxLength) {
            longestWord = word;
            maxLength = word.length;
        }
    })
    return {longestWord, maxLength}
}
// console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));

//重要的事情说3遍！重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。例如：
//repeat("", 3) 应该返回"*".   //repeat("abc", 3) 应该返回"abcabcabc".
function repeat(str, num) {
    if (num < 0) return '';
    let res = '';
    for (let i = 0; i < num;i++) {
        res+=str;
    }
    return res;
}
// console.log(repeat("abc", 3));

//  一， 用正则表达式来将字符串 "I? love ?? the ?great ? ?wall in ?beijing"
  // 更改为： "I love the Great Wall in Beijing"，
  // 主要是为了解决编码的问题导致的问题， 规律：
  // 1， 乱码只有两种特殊字符分别是 '?' 和 ' ';
  // 2， 如果乱码的末尾是 '?'  则它的下一位字母肯定是大写；
function regStr(str) {
    let strArr = str.split('?');
    strArr.forEach((val, key) => {
        strArr[key] = strArr[key].charAt(0).toUpperCase() + strArr[key].slice(1);
    })
    strArr = strArr.join('').replace(/\?/g, '');
    console.log(strArr);
}
regStr('I? love ?? the ?great ? ?wall in ?beijing');
