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
