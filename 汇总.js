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

// --------------  深拷贝   --------------
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
// 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
// 这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：

// 检查map中有无克隆过的对象
// 有 - 直接返回，没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆
function deepClone1(obj, map = new WeakMap()) {
    if (typeof obj !== 'object') return obj;
    if (map.get(obj)) return map.get(obj);
    let cloneObj = Array.isArray(obj) ? [] : {};
    map.set(obj, cloneObj);
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone1(obj[key], map);
        }
    }
    return cloneObj;
}

// const target1 = {
//     field1: 1,
//     field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8]
// };
// target1.target = target1;
// const copy1 = deepClone1(target1);
// target1.d = [2,3.4,5];
// console.log(copy1); 
// console.log(target1); 

//  --------------  手写bind --------------  
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
//   }
//   var obj1 = {
//     name: 'yiyi'
//   }
//   var child = one.mybind(obj1, 2);
//   child(3);
  
//   var two = new child(4);
//   console.log(two)
// 手写call
Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('必须是函数调用call');
    }
    context = context || window;
    context.func = this;
    let res = context.func(...args);
    delete context.func;
    return res;
}
// 手写apply
Function.prototype.myApply = function(context, arr) {
    if (typeof context.func !== 'function') {
        throw new TypeError('必须是函数调用call');
    }
    context = context || window;
    context.func = this;
    let res = context.func(...arr);
    delete context.func;
    return res;
}
// var foo = {
//     name: "Selina",
// };
// var name = "Chirs";

// function bar(job, age) {
//     console.log(this.name);
//     console.log(job, age);
// }
// bar.myCall(foo, "programmer", 20);

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
// 第2种写法
function shellSort1(nums) {
    const len = nums.length;
    // 比插入排序多了设置步长这一步
    for (let step = len >> 1; step > 0; step >>= 1) {
      for (let i = step; i < len; i++) {
        // 按 step 先取出关键牌
        const key = nums[i];
        // 要比较的前一位
        let j = i - step;
        while(j >= 0 && nums[j] > key) {
          // 把前一位赋值给后一位
          nums[j + step] = nums[j];
          // 按 step 值步进
          j -= step;
        }
        // 把关键牌放到前一位上
        nums[j + step] = key;
      }
    }
    return nums;
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
// 7.计数排序
// 找出待排序的数组中最大和最小的元素；
// 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
// 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
// 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
    return arr;
}
// 8.归并排序
function mergeSort(nums) {
    const len = nums.length;
    // 递归到最小层的时候，终止条件
    if (len < 2) return nums;
    // 折半分组，一直折半到只剩一个元素为止，这就是分治的思想
    let pivot = len >> 1;
    let leftNums = mergeSort(nums.slice(0, pivot));
    let rightNums = mergeSort(nums.slice(pivot));
    // 这一步就是从最小层开始，分别把折半后的左边和右边的数排好序，最后出来的就是排好序的数据了。
    // 归并
    return merge(leftNums, rightNums);
  }
  
  function merge(leftNums, rightNums) {
    // 额外申请一个 n 的空间
    const result = [];
    while (leftNums.length > 0 && rightNums.length > 0) {
      if (leftNums[0] <= rightNums[0]) {
        result.push(leftNums.shift());
      } else {
        result.push(rightNums.shift());
      }
    }
    return result.concat(leftNums, rightNums);
  }
// 9.堆排序
// 1、把数组看成是二叉树形结构，按照顺序一路二三排将下来
// 2、找子结点公式：已知父结点是 i，那么其左右子结点分别是：2i+1 和 2i+2
// 3、子结点比父结点大，交换一下；继续比较孙结点......
// 4、树顶最大元素和最后一个元素交换，这时最后的元素就是排好序的了。
function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  
  function maxHeapify(nums, start, end) {
    // 建立父结点和子结点
    let dad = start;
    // dad * 2 + 1 可以找到左子结点
    let son = (dad << 1) + 1;
    // 若子结点在范围内才做比较
    while (son <= end) {
      // 先比较两个子结点大小，选择最大的
      if (son + 1 <= end && nums[son] < nums[son + 1]) {
        son += 1;
      }
      // 如果父结点大于子结点代表调整完毕，直接跳出函数
      if (nums[dad] > nums[son]) {
        return;
      } else {
        // 否则交换父子内容，再继续子结点和孙结点比较
        swap(nums, dad, son);
        dad = son;
        son = (dad << 1) + 1;
      }
    }
  }
  
  function heapSortMethod(nums, len) {
    // 初始化，i 从最后一个父结点开始调整，(len / 2) - 1 一定能找到最后一个父结点
    for (let i = (len >> 1) - 1; i >= 0; i--) {
      maxHeapify(nums, i, len - 1);
    }
    // 初始化最大顶堆调整完了，这时把堆顶元素和最末一个元素交换，这样最末尾的元素就是排好序的了
    for (let j = len - 1; j > 0; j--) {
      swap(nums, 0, j);
      maxHeapify(nums, 0, j - 1);
    }
  }
  
  function heapSort(nums) {
    const arr = [...nums];
    heapSortMethod(arr, arr.length);
    return arr;
  }
  
//   console.log(heapSort([6, 1, 9, 4, 2, 7, 0]));
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
    let resArr = str.split('?');
    resArr.forEach((val, key) => {
        resArr[key] = resArr[key].charAt(0).toUpperCase() + resArr[key].slice(1);
    })
    resArr = resArr.join('').replace(/\?/g, '');
    console.log(resArr);
}
// regStr('I? love ?? the ?great ? ?wall in ?beijing');

// 统计一个字符串出现最多的字母
  // 输入 ： afjghdfraaaasdenas
  // 输出 ： a
  // 思路：1. 得到每个字符出现的次数：遍历字符串，如果新对象里没有字符，将新对象的对应字符值=1；有的话+1；  
  // 2.查找新对象中出现次数最多的字符:遍历新对象，如果新对象中字符出现次数大于前一个字符的话，将此字符赋给maxChar，值赋给新maxValue，一此循环，找到出现最多的字符
  function getMaxAndIndex(str) {
    if(!str.length) return;
    if (str.length === 1) return 1;
    let h ={},maxNum = 0,maxStr = '';
    for (let i = 0; i < str.length; i++) {
        let a = str[i];
        h[a] === undefined ? h[a]=1 : h[a]++
        if(h[a] > maxNum) {
            maxNum = h[a]
            maxStr = a
        }
    }
    return [maxStr, maxNum];
  }
//   console.log(getMaxAndIndex('afjghdfraaaasdenas'));

  // 字符串每个单词首字母大写，其他小写
  function titleCase(str) {
    str = str.split(' ');
    for(let i=0;i<str.length;i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1).toLowerCase();
    }
    console.log(str.join(' '));
  }

//   titleCase('asd ffd dff ww ADFF ddfSF');

// 自由可灵活配置的时间调度器，
// 有a, b, c, d...很多个需要被调度的方法（ 方法名称的命名可随意）， 调度有两种形式， 一个是顺序调用（ 例如调度完a后才能调度b）， 一个是间隔某个时间进行循环调度。 用一个统一的方法进行封装可以实现下列的例子：
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
// let a1 = () => {
//     console.log("a");
//   }
//   let b1 = () => {
//     console.log("b");
//   }
//   let c1 = () => {
//     console.log("c");
//   }
//   let d1 = () => {
//     console.log("d");
//   }
  //1，可以为5秒后调用a,3秒后调用b，10秒后调用。c...z方法不执行（不执行的方法可以设计成不传递参数），那么在第14秒的时候开始重新从0秒循环，又变成第一秒后调用a,3秒后调用b，这样循环往复；
//   const timeScheduler1 = new TimeScheduler();
//   timeScheduler1.add(a1, 5);
//   timeScheduler1.add(b1, 3);
//   timeScheduler1.add(c1, 10);
  // 2，每间隔6秒调用一次a,每间隔4秒调用一次b，c...z方法不执行；
//   timeScheduler1.add(b1,4);
//   timeScheduler1.add(a1,6);
  // 3，第一秒先执行a，3秒后执行b，但是c却是每间隔3秒执行一次，d是每间隔4秒执行一次，a和b是每4秒进行一次循环；
//   timeScheduler1.add(a1,1);
//   timeScheduler1.add(b1,3);
//   timeScheduler1.add(c1,3);
//   timeScheduler1.add(d1,4);
    // 4，a不执行，b和c每间隔3秒执行一次，d不执行；
// timeScheduler1.add(b1,3);
// timeScheduler1.add(c1,3);
//   timeScheduler1.next();
function DayLife() {
    this.funcs = [];
    this.dothing = function(fn, time) {
        const func = () => {
            setTimeout(() => {
                fn();
                this.next();
            }, (time - 8) * 1000)
        }
        this.funcs.push({func});
    }
    this.next = function() {
        let obj = this.funcs.shift() || {};
        if (obj.func) {
            this.funcs.push(obj);
            obj.func();
        }
    }
}
const a1 = ()=> { console.log("起床");}
const b1 = ()=> { console.log("刷牙");}
const c = ()=> { console.log("上班");}
const d = ()=> { console.log("下班");}
const e = ()=> { console.log("睡觉");}
const dayLife = new DayLife();
async function thing(){
  dayLife.dothing(a1, 8);
  dayLife.dothing(b1, 9);
  dayLife.dothing(c, 10);
  dayLife.dothing(d, 17);
  dayLife.dothing(e, 22);
  dayLife.next();
}
// thing()

//数组合并去重
let arr1 = [1,8,9,4,5,12]
let arr2 = [2,3,10,11,6,13,14,15,16,17,18,19,20]
let arrconcat = [];
// console.log(arrconcat.concat(arr1, arr2).sort((a, b) => a-b));
function flat(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flat(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}
// console.log(flat([1, [4, 5, [6, 7]]]));


// -------------------diff算法-------------------
// 关于diff算法：
// 先根据真实的dom生成一个virtual dom(虚拟dom)，当dom中的某个节点发生变化时会生成一个新的vnode，去和oldvnode做比较，如果不同则真实的dom上的vnode会被替换vnode，diff的过程就是调用patch函数，一边比较新旧节点的变化，一边为真实的dom打补丁。
// virtual dom和真实dom的区别在于:virtual dom是将真实的dom，以对象的形式模拟(树形结构)出来，vnode和oldvnode都是对象。
// 真实dom:
// <div>
//    <p>123</p>
//</div>
// 虚拟dom结构：
let vnode = {
    tag: 'div',
    children: {
        tag: 'p',
        text: '123'
    }
}
// 当数据发生变化时，set会调用Dep.notify，通知所有的订阅者watcher，接下来订阅者就会调用patch给真实dom打补丁，触发视图更新
function patch(oldVNode, vNode) {
    if (sameVNode(oldVNode, vNode)) {
        patch(oldVNode, vNode);
    } else {
        const oEl = oldVNode.el;
        let parentEle = api.parentNode(oEl);
        createElement(vNode);
        if (parentEle !== null) {
            api.insertBefore(parentEle.vnode.el, api.nextSibing(oEl));
            api.removeChild(parent, oldVNode.el);
            oldVNode = null;
        }
        return oldVNode;
    }
}
// 判断两个节点的值是否值得比较，如果值得比较就执行patchvnode
function sameVNode(a, b) {
    a.key === b.key && //key值
    a.tag === b.tag && // 标签名
    a.isComment === b.isComment && // 是否注释
    isDef(a.data) === isDef(b.data) && // 是否都定义了data，data包含具体的信息，如onclick,style
    sameInputType(a, b) // 当前标签<input>的时候，type必须相同，原因：input有很多种type，如button，CheckBox，password，submit，text
}

// 不值得比较就用vnode替换oldVnode
// 如果两个节点都是一样的，那么就深入检查他们的子节点，如果两个节点不一样，那就说明vnode完全被改变了，可以直接替换oldvnode。虽然他这两个节点不一样但是子节点一样怎么办，别忘了，diff是逐层比较的，如果第一层不一样那么就不会继续深入比较第二层了。
// pathVnode 当我们确定两个值值得比较后，会对两个节点指定的pathvnode方法
function pathVnode(oldVNode, vnode) {
    const el = vnode.el = oldVNode.el;
}
// console.log(patchVnode(node, vnode))

//-------------继承
// 1.原型链继承
// 缺点：1.所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）2.无法在不影响所有实例对象的情况下，给父类的构造函数传递参数。
// function Parent(name, gender) {
//     this.name = name;
//     this.gender = gender;
//     this.list = [1,2,3];
// }
// Parent.prototype.eat = function() {
//     console.log('晚餐时间到');
// }
// function Child(age) {
//     this.age = age;
// }

// Child.prototype = new Parent('李白', '男');
// let child = new Child(10);
// let child2 = new Child(20);
// child.eat();
// console.log(child.list, child2.list);
// child.list.push(4);
// console.log(child.list, child2.list);
// 2构造函数继承，只能继承属性，不能继承方法
// function Parent(name) {
//     this.name = name;
// }
// Parent.prototype.sayHi = function() {console.log('hello');}
// function Child(name, age, sex) {
//     Parent.call(this, name);
//     this.age = age;
//     this.sex = sex;
// }
// let child = new Child('aa', 18, '女');
// console.log(child.name);
// child.sayHi();//  Uncaught TypeError:child.sayHi is not a function

// 3组合继承
function Parent() {
    this.name = 'aa';
    this.age = 20;
    this.list = [1,2,3];
}
Parent.prototype.sayHi = function() {console.log('hello');}
function Child() {
    Parent.call(this);
    this.address = '北京';
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

let s1 = new Child();
let s2 = new Child();
// s1.sayHi();
// console.log(s1.name);
// console.log(Child.prototype.constructor); //Child
// console.log(s2.constructor); //Child
// es6 extends super继承
class Animal {
    constructor(props) {
        this.name = props.name ||'unknown';
    }
    eat() {
        console.log(this.name);
    }
} 
class Bird extends Animal {
    constructor(props, myAttribute) {
        super(props);
        this.type = props.type || 'unknown';
        this.attr = myAttribute;
    }
    fly() {
        console.log(this.name);
    }
    myattr() {
        console.log(this.type + '-------' + this.attr);
    }
}

let myBird = new Bird(
    {
        name: '',
        type: 'Egg animal'
    },
    'Bird class'
)
// myBird.eat();
// myBird.fly();
// myBird.myattr();


// --------------------- js设计模式 ---------------------
// 单例模式
function Person() {}
function singleton() {
    let instance;
    if (!instance) instance = new Person();
    return instance;// 返回永远都是第一次new Person的示例，永远是一个示例
}
// const p1= singleton();
// const p2= singleton();
// console.log(p1===p2); // false
// 组合模式
class A {
    init() {console.log('aa')};
}
class B {
    init() {console.log('bb')};
}
class C {
    init() {console.log('cc')};
}
//上面实例化对象的启动方式都一致,把这几个函数以组合模式的情况书写然后统一启动
class Compose {
    constructor() {
        this.compose = [];
    }
    add(task) { // 添加任务的方法
        this.compose.push(task);
    }
    execute() {  // 一个执行任务的方法
        this.compose.forEach(item => item.init());
    }
}
// const c1 = new Compose();
// // 把所有要完成的任务都放在队列里面
// c1.add(new A());
// c1.add(new B());
// c1.add(new C());
// // 直接器动任务队列  // 就会按照顺序执行三个对象中的 init 函数
// c1.execute();

// LazyMan类
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
        this.taskQueue = [];
        this.timer = null;
        this.sayHi(name);
    }
    run() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(async() => {
            for(let func of this.taskQueue) {
                await func();
            }
            this.taskQueue = [];
            this.timer = null;
        })
        return this;
    }
    sayHi(name) {
        this.taskQueue.push(async () => {
            console.log(`hi i am ${name}`);
        })
        return this.run();
    }
    eat(food) {
        this.taskQueue.push(async () => {
            console.log(`eat ${food}`);
        })
        return this.run();
    }
    sleep(second) {
        this.taskQueue.push(async () => {
            console.log(`sleep ${second}s`);
            return this._timeout(second);
        })
        return this.run();
    }
    sleepFirst(second) {
        this.taskQueue.unshift(async () => {
            console.log(`sleep first ${second}s`);
            return this._timeout(second);
        })
        return this.run();
    }
    _timeout(second) {
        return new Promise(resolve => setTimeout(resolve, second*1000));
    }
}

let LazyMan = (name) => new lazyMan(name);
// LazyMan('Hank');
// LazyMan('Hank').sleep(5).eat('dinner');
// LazyMan('Hank').eat('dinner').eat('supper');
// LazyMan("Hank").sleepFirst(5).eat("supper");

// -------------vue的observer-------------
function observer(obj) {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]));
    return obj;
}

function defineReactive(obj, key, val) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            dep.depend();
            console.log(`${key}属性被读取了`);
            return val;
        },
        set(newVal) {
            console.log(`${key}属性被改了`);
            val = newVal;
            dep.notify();
        }
    })
}
class Dep {
    constructor(){
        this.subs = []
    }
    //增加订阅者
    addSub(sub){
        this.subs.push(sub);
    }
    //判断是否增加订阅者
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }
    //通知订阅者更新
    notify(){
        this.subs.forEach((sub) =>{
            sub.update()
        })
    }
}
Dep.target = null;
// -------------vue的watcher-------------
class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get();
    }
    update() {
        let value = this.vm.data[this.exp];
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
        }
        this.cb.call(this.vm, value, oldVal)
    }
    get() {
        Dep.target = this;
        let value = this.vm.data[this.exp];
        Dep.target = null;
        return value;
    }
}

// reduce 数组去重并打印当前元素存在几个
// const arr12 = [1,2,3,4,2,2];
// let obj1 = {};
// let val1 = arr12.reduce((cur, next) => {
//     if (!obj1[next]) {
//         cur.push(next);
//         obj1[next] = 1;
//     } else {
//         obj1[next] = obj1[next]+1;
//     }
//     return cur;
// }, [])
// console.log(obj1);
// console.log(val1);
// 普通版防抖
// let count = 1;
// let eventCb = () => {
//     count++;
//     console.log(count);
// }
// let debounce = (fn, wait) => {
//     let timer;
//     return function() {
//         let _this = this;
//         if (timer) {
//             clearTimeout(timer);
//         }
//         timeout = setTimeout((...args) =>{
//             fn.apply(_this, args)
//         }, wait);
//     }
// }
// debounce(eventCb, 1000);
// 优化版防抖
let count = 1;
let eventCb = () => {
    count++;
    console.log(count);
}
function debounce(func, wait, immediate) {
    let timeout, result;
    let debounced = function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) {
                result = func.apply(context, args)
            }
        } else {
            timeout = setTimeout(function() {
                func.apply((context, args))
            }, wait)
        };
        return result;
    }
    debouce.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
    return debouce;
}


// var setUseAction=debounce(getUserAction, 3000, true);
// container.onmousemove = setUseAction;
// document.getElementById("button").addEventListener("click", function(){
//   setUseAction.cancel();
// });

// 图片懒加载
// window.onload = lazyImg;
// function lazyImg() {
//     const lazyImgs = document.querySelectorAll('img[data-src]');
//     if (lazyImgs.length === 0) {
//         return;
//     }
//     const scrollTop = document.documentElement.scrollTop;
//     const wh = window.innerHeight;
//     //图片懒加载-传统方式
//     lazyImgs.forEach(item => {
//         if (item.offsetTop <= (scrollTop + wh)) {
//             item.src= item.getAttribute('data-src');
//             item.removeAttribute('data-src');
//         }
//     });
//     // getBoundingRect方式
//     lazyImgs.forEach(item => {
//         const container = item.getBoundingClientRect();
//         if (container.top <= wh) {
//             item.src= item.getAttribute('data-src');
//             item.removeAttribute('data-src');
//         }
//     });
//     const ob = new IntersectionObserver(entries => {
//         entries.forEach(item => {
//             const container = item.target;
//             if (item.isIntersecting) {
//                 container.src = container.getAttribute('data-src');
//                 container.removeAttribute('data-src');
//                 ob.unobserve(container);
//             }
//         })
//     })
//     lazyImgs.forEach(item => ob.observe(item));
// }

// 并行限制的promise调度器
// 实现有并行限制的 Promise 调度器问题。一个任务并发控制器，要求每次都有两个任务在执行：
// 正常情况下，promise是没有并发数量限制的，同一个时间可以多个请求同时执行，然后谁返回的速度快，在前端页面直观的就可以打印谁的返回内容。
// 限制并发数量，假定并发数量最大是2。什么意思呢，就是我们上面例子中，执行任务的盒子，第一个addTask可以放进去，第二个也可以放进去，但第三个不可以立马放进去，因为最大并发数量是2，需要过1000ms，等第二个addTask执行完毕后，那此刻执行任务盒子里只有1个盒子，可以把第三个放进。。。。

class Scheduler {
    constructor() {
        this.queue = []; // 任务队列
        this.maxCount = 2; // 最大并行数
        this.runCounts = 0; // 跑了几个任务了
    }
    add(fn) {
        this.queue.push(fn);
    }
    taskStart() {
        for(let i =0;i<this.maxCount;i++) {
            this.request();
        }
    }
    request() {
        if (this.queue.length === 0 || this.runCounts > this.maxCount) {
            return;
        }
        this.runCounts++;
        // 不同情况要改造
        this.queue.shift()().then(() => {
            // 这里 this.queue.shift() 和 !this.queue || !this.queue.length 可以用这种办法
            this.runCounts--;
            this.request();
        })
    }
}
const timeout = (time) => new Promise(resolve => setTimeout(resolve, time));

const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(() => {
        return timeout(time).then(() => console.log(order));
    })
}
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
// scheduler.taskStart();

// 防抖debounce
function debounce(fn, time, immediate) {
    let timeout, res;

    let debounced = function() {
        let _this = this,args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null
            }, time);
            if (callNow) res = fu.apply(_this, args);
        } else {
            timeout = setTimeout(function() {
                fn.apply(_this, args);
            }, time)
        }
        return res;
    }
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
    return debounced;
}

// -------函数的特性与原型链案例-------
// 参考https://juejin.cn/post/6844904013754793991#heading-15
// 首先，定义一个函数，将会作为构造函数
// function Foo() {}
// // 实例化出来一个对象
// const obj1 = new Foo();
// // 在 Object 的原型上定义一个属性：objProp
// Object.prototype.objProp = '我是 Object 原型上的属性';
// // 在 Function 的原型上定义一个属性：funcProp
// Function.prototype.funcProp = '我是 Function 原型上的属性';
// // 你预想一下，以下这些分别会输出什么？
// // 你预想一下，以下这些分别会输出什么？
// console.log(obj.objProp) // ?我是 Object 原型上的属性
// // obj.__proto__ === Foo.prototype,  Foo.prototype.__proto__=== Object.prototype有objProp

// console.log(obj.funcProp) // ?undefined
// // obj.__proto__ === Foo.prototype, Foo.prototype.__proto__=== Object.prototype，Object.prototype上找不到funcProp

// console.log(Foo.objProp) // ?我是 Object 原型上的属性
// // Foo.__proto__ === Function.prototype, Function.prototype.__proto__=== Object.prototype, 有objProp

// console.log(Foo.funcProp) // ?我是 Function 原型上的属性
// // Foo.__proto__ === Function.prototype, funcProp


// console.log(Object.objProp) // ?我是 Object 原型上的属性
// // object是个函数对象, Object.__proto__ === Function.prototype,  Function.prototype.__proto__=== Object.prototype, 有objProp


// console.log(Object.funcProp) // ?我是 Function 原型上的属性
// // object是个函数对象, Object.__proto__ === Function.prototype,有funcProp


// console.log(Function.objProp) // ?我是 Object 原型上的属性
// // Function是个函数对象，Function.__proto__ === %Function.prototype，%Function.prototype.__proto__ === Object.prototype, 有objProp


// console.log(Function.funcProp) // ?我是 Function 原型上的属性
// // Function是个函数对向，Function.__proto__ === %Function.prototype,有funcProp

// console.log(Array.objProp) // ?我是 Object 原型上的属性
// // array是个函数对象，Array.__proto__ === Function.prototype，Function.prototype.__proto__=== Object.prototype, 有objProp

// console.log(Array.funcProp) // ?我是 Function 原型上的属性
// // // array是个函数对象，Array.__proto__ === Function.prototype，有funcProp

// ajax并发请求限制
// 实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：
// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出
// multiRequest 可以返回一个 promise 或者 直接执行 callback 回调

// 思路：
// 整体采用递归调用来实现：最初发送的请求数量上限为允许的最大值，并且这些请求中的每一个都应该在完成时继续递归发送，通过传入的索引来确定了urls里面具体是那个URL，保证最后输出的顺序不会乱，而是依次输出。

// 参考：https://cloud.tencent.com/developer/article/1784512
let urlIndex = 0;
const axios = (url)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(url + `/?username=${++urlIndex}&password=${urlIndex}`);
        },1000)
    })
}
function multiRequest(urls = [], maxNum, callback) {
    // 请求总数量
    const len = urls.length;
    // 根据请求数量创建一个数组来保存请求的结果
    let result = new Array(len).fill(false);
    // 当前完成的数量
    let count = 0;
    return new Promise((resolve, reject) => {
        // 请求maxNum个
        while(count < maxNum) {
            next();
        }
        function next() {
            const current = count++;
            console.log(current, count, len, current >= len, result);
            // 处理边界条件
            if (current >= len) {
                // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
                !result.includes(false) && resolve(result);
                callback && callback(result);
                return;
            }
            const url = urls[current];
            // console.log(url, '开始');
            axios(url).then(res => {
                // 保存请求结果
                result[current] = res;
                // console.log(url, '结束');
                // 请求没有全部完成, 就递归
                if (current < len) {
                    next();
                }
            }).catch(err => {
                result[current] = err;
                // console.log(url, '失败');
                // 请求没有全部完成, 就递归
                if (current < len) {
                    next();
                }
            })
        }
    })
}
const urls = ["/url1","/url2","/url3","/url4","/url5","/url6"];
// multiRequest(urls, 2, data=>{
//     console.log(data);
// })

// 请求并发数量限制
// 题2：实现一个并发请求控制，你可以创建一个管理请求的队列，并通过设置一个最大并发数来控制同时进行的请求数量。
// 当一个请求完成时，你可以从队列中取出下一个请求并执行它。以下是一个简单的 JavaScript 例子，它展示了如何使用 Promise 来管理并发请求。
// 假设我们有一个 sendRequest 函数，这个函数接收一个 url，并返回一个 Promise。我们的目标是控制这些请求的并发数。
class RequestQueue {
    constructor(maxConcurrent) {
      this.maxConcurrent = maxConcurrent; // 设置最大并发数
      this.currentRunning = 0; // 当前正在运行的请求数
      this.queue = []; // 等待执行的请求队列
    }
  
    // 将请求封装成一个函数，推入队列，并尝试执行
    enqueue(url) {
      return new Promise((resolve, reject) => {
        const task = () => {
          // 当请求开始时，currentRunning 加 1
          this.currentRunning++;
          sendRequest(url).then(resolve).catch(reject).finally(() => {
            // 请求结束后，currentRunning 减 1，并尝试执行下一个请求
            this.currentRunning--;
            this.dequeue();
          });
        };
        this.queue.push(task);
        this.dequeue(); // 每次添加请求后尝试执行请求
      });
    }
  
    dequeue() {
      // 如果当前运行的请求小于最大并发数，并且队列中有待执行的请求
      if (this.currentRunning < this.maxConcurrent && this.queue.length) {
        // 从队列中取出一个请求并执行
        const task = this.queue.shift();
        task();
      }
    }
}
  
// 这个函数是模拟发送请求的，实际中你可能需要替换成真实的请求操作
function sendRequest(url) {
    console.log(url, '开始');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(url, '响应');
        resolve(`Result from ${url}`);
      }, Math.random() * 2000); // 随机延时以模拟请求处理时间
    });
}
  
// 使用 RequestQueue
const requestQueue = new RequestQueue(3); // 假设我们限制最大并发数为3
  
// 模拟批量请求
// const urls1 = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6'];
// urls1.forEach(url => {
//     requestQueue.enqueue(url).then(result => {
//       console.log(result);
//     });
// });

// async await简单实现
// 参考https://juejin.cn/post/6967260930862219272
function runGenerator(gen) {
    return new Promise((resolve, reject) => {
        let g = gen();
        function _next(val) {
            let res = null;
            try {
                res = g.next(val);
            } catch (error) {
                return reject(error);
            }
            if (res.done) {
                return resolve(res.value);
            }
            Promise.resolve(res.value).then(
                value => _next(value),
                err => g.throw(err)
            )
        }
        _next();
    })
}

function* myGenerator() {
    try {
        const res1 = yield Promise.resolve(1);
        console.log('res1:', res1);
        const res2 = yield 2;
        console.log('res2:', res2);
        const res3 = yield Promise.reject('error');
        console.log('res3:', res3);
    } catch (error) {
        console.log(error);
    }
}
// const gen = runGenerator(myGenerator); 
// console.log(gen);

// js 全排列
// https://www.cnblogs.com/EaVango/p/15526330.html
// 从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，叫做从n个不同元素中取出m个元素的一个排列。当m=n时所有的排列情况叫全排列。

// 如果有m个元素，全排列的可能方式有m!种，即3个元素，有3*2*1=6种。4个元素有4*3*2*1=24种。

// 怎么用算法实现呢，我们可以参照下图，遍历整个数组，取出遍历的元素，放到一个temp数组中，然后把剩余元素递归地继续去做遍历，继续取出元素放到temp中，最后当temp中的元素与原数组长度相同时候，递归结束，temp数组也即是全排列的一种情况。
let parenthesis = arr => {
    let len = arr.length, res = [];
    (function handler(tmp, remain) {
        if (tmp.length === len) res.push(tmp.join(''));
        remain.forEach((item, index) => {
            let cur = [...remain];
            cur.splice(index, 1);
            handler(tmp.concat(item), cur);
        })
    })([], arr)
    return [...new Set(res)];
}
// console.log(parenthesis([1, 2]));

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
// function AB(par) {
//     this.one = 1,
//     this.two = 2,
//     this.print = function() {
//         console.log(this.one, par);
//     }
// };
// const b2 = myNew(AB, 23);
// b2.print();


// promise-es6写法
// 参考：https://www.bilibili.com/video/BV1jP4y117Hc/?spm_id_from=333.337.search-card.all.click&vd_source=e8999a538a8fb41f0b978c25d61cdea7
class MyPromise {
    constructor(exector) {
        this.status = 'pending';
        this.result = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        
        try {
            exector(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.result = result;
            this.onFulfilledCallbacks.forEach(fn => fn(result));
        }
    }
    reject(reason) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => fn(reason));
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            resolve(this.result);
                        } else {
                            let x = onFulfilled(this.result);
                            resolvePromise2(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        if (typeof onRejected === 'function') {
                            reject(this.reason);
                        } else {
                            let x = onRejected(this.reason);
                            resolvePromise2(Promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error);
                    }
                })
            } else if (this.status === 'pending') {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onFulfilled !== 'function') {
                                resolve(this.result);
                            } else {
                                let x = onFulfilled(this.result);
                                resolvePromise2(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onRejected === 'function') {
                                reject(this.reason);
                            } else {
                                let x = onRejected(this.reson);
                                resolvePromise2(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    })
                })
            }
        });
        return promise2;
    }
    all(promiseArr) {
        return new Promise((resolve, reject) => {
            const len = promiseArr.length;
            let res = [], count = 0;
            if (len === 0) {
                return resolve(res);
            }
            for(let [i, p] of promiseArr.entries()) {
                MyPromise.resolve(p).then(data => {
                    res[i] = data;
                    count++;
                    if (count == len) {
                        resolve(res);
                    }
                },
                reason => reject(reason)
                )
            }
        })
    }
}

function resolvePromise2(promise2, x, resolve, reject) {
    if (x === promise2) {
        throw new TypeError('promise error');
    }
    if (x instanceof MyPromise) {
        x.then(y => resolvePromise2(promise2, y, resolve, reject), reject);
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
        } catch (error) {
            return reject(error);
        }
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x, 
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise2(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            resolve(x)
        }
    } else {
        return resolve(x);
    }
}

let p1 = new MyPromise((resolve, reject) => {
    resolve('成功了')
  })
   
  let p2 = new MyPromise((resolve, reject) => {
    resolve('success')
  })
   
//   let p3 = MyPromise.reject('失败')
   
// MyPromise.all([p1, p2]).then((result) => {
//     console.log(result)               //['成功了', 'success']
//   }).catch((error) => {
//     console.log(error)
//   })
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
  
  p.then(res => {
    console.log('first then', res)
    return res + 1
  }).then(res => {
    console.log('first then', res)
  })
  
  p.then(res => {
    console.log(`second then`, res)
    return res + 1
  }).then(res => {
    console.log(`second then`, res)
  })