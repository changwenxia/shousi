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
//     console.log('-----', tree.id);
//     if (tree.left) rootLR(tree.left);
//     if (tree.right) rootLR(tree.right);
// }
// rootLR(tree);
// 2.左根右 中序遍历 4251637
// function LRootR(tree) {
//     if (tree.left) LRootR(tree.left);
//     console.log('-----', tree.id);
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
// 4 根左右 前序非递归 4251637
// function w_LRootR(tree) {
//     let arr = [], res = [];
//     while(true) {
//         while(tree) {
//             arr.push(tree);
//             tree = tree.left;
//         }
//         console.log(1, arr, res, tree);
//         if (!arr.length) break;
//         let tmp = arr.pop();
//         res.push(tmp.id);
//         tree = tmp.right;
//         console.log(2, arr, res, tree);

//     }
//     return res;
// }
// console.log(w_LRootR(tree)); 
// 6 左右跟 后序非递归遍历 4526731
function w_LRRoot(tree) {
    let arr = [tree], res = [];
    while(arr.length) {
        let tmp = arr.pop();
        res.push(tmp.id);
        console.log(1, arr, tmp, res);

        if (tmp.left) arr.push(tmp.left); 
        if (tmp.right) arr.push(tmp.right); 
    }
    return res.reverse();
}
w_LRRoot(tree)
// console.log(w_LRRoot(tree));