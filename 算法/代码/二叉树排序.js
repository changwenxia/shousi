// 栈 先入后出  后入先出
// 参考：https://www.jb51.net/article/255315.htm
function createStack(data) {
  if (!Array.isArray(data)) return console.error("the params type needs to be Array");
  this.data = data;
  this.length = data.length;
  this.add = (item) => {
    this.data.push(item);
    this.length++;
  }
  this.get = () => {
    return this.data.pop();
  }
}
let stack = new createStack([3, 6, 8]);
stack.add(4)
// for(let i=0;i< stack.length; i++){
//   console.log("=====", stack.get());
// }
// 二叉树查找
let tree = { // 树结构 
  id: 1,
  left: { id: 2,  left: { id: 4}, right: { id: 5 }},
  right: { id: 3, left: { id: 6}, right: { id: 7 }}
}
// 1.根左右 前序递归 1245367
function rootLR(tree) {
  console.log("===", tree.id);
  if (tree.left) rootLR(tree.left);
  if (tree.right) rootLR(tree.right);
}
// 2.左跟右 中序遍历 4251637
function LRootR(tree) {
  if (tree.left) LRootR(tree.left);
  console.log("===", tree.id);
  if (tree.right) LRootR(tree.right);
}
// 3.左右跟 后序遍历 4526731
function LRRoot(tree) {
  if (tree.left) LRRoot(tree.left);
  if (tree.right) LRRoot(tree.right);
  console.log("===", tree.id);
}
// 4.根左右 前序非递归 1245367
function w_rootR(tree) {
  // 定义一个栈
  let res = [],
    arr = [tree]
  while (arr.length) {
    let tmp = arr.pop();
    res.push(tmp.id);
    // 栈先入后出，所以需要先入右子树才能保证先出左子树
    if (tmp.right) arr.push(tmp.right)
    if (tmp.left) arr.push(tmp.left)
  }
  return res
}
//5 左根右 中序非递归 4251637
function w_LRootR(tree) {
  let arr = [],
    res = [];
  while (true) {
    while (tree) {
      arr.push(tree);
      tree = tree.left;
    }
    if (!arr.length) break;
    let tmp = arr.pop();
    res.push(tmp.id);
    tree = tmp.right;
  }
  return res;
}

function w_LRootR(root) {
  if (!root) return;
  const stack = [],res = [];
  let p = root; // 定义一个指针
  // 如果指针有数据或者p不是null，则继续遍历
  while(stack.length || p) {
    // 如果p存在则将p入栈并移动指针
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const node = stack.pop();
    res.push(node.id);
    p = node.right;
  }
  return res;
}
// 6左右跟 后序非递归遍历 4526731
function w_LRRoot(tree) {
  let arr = [tree], res = [];
  while(arr.length) {
    let tmp = arr.pop();
    res.push(tmp.id);
    if (tmp.left) arr.push(tmp.left);
    if (tmp.right) arr.push(tmp.right);
  }
  return res.reverse();
}
console.log(w_LRRoot(tree));