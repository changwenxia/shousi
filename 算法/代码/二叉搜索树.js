// 二叉搜索树
// 参考：https://blog.csdn.net/qq_15509251/article/details/131652868
// 满足一下几个性质：
    // 1，若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
    // 2，若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
    // 3，若任意节点的左、右子树也需要满足左边小右边大的性质
  // 二叉树搜索树的链式存储结构 二叉搜索树的节点通常包含四个域，数据元素，分别指向左、右节点的指针和一个指向父节点的指针，一般把这种存储结构成为三叉链表。
  // 代码初始化一个二叉搜索树的节点：

  // 向二叉搜索树中插入数据
  // 向一个二叉搜索树插入数据实现思路如下：
  
  // 判断root是否为空，如果为空则创建root；
  // 如果root非空，则需要判断插入节点的val比根节点的val是大还是小；
  // 如果比根节点小，说明是左子树的节点；
  // 如果比根节点大，说明是右子树的节点；
  // 上面两步重复执行，直到找到一个点，如果这个点小于我们要插入的值，且不存在右子树，将这个点作为其右叶子节点；如果这个点大于我们要插入的值，且不存在右子树，将这个点作为其左叶子节点。
class BinarySearchTree {
  constructor() {
    // 初始化根节点
    this.root = null
  }
  // 创建一个节点
  Node(val) {
    return {
      left: null, // 左子树
      right: null, // 右子树
      parent: null, // 父节点
      val,
    }
  }

  insertNode(val) {
    const that = this;
    // 允许接收一个数组，批量插入
    if (Object.prototype.toString.call(val) === "[obejct Array]") {
      val.forEach(v => that.insertNode(v));
      return;
    }

    if (typeof val !== 'number') throw newError('不是一个数字');
    const newNode = this.node(val);
    if (this.root) {
      // 根节点非空
      this.#insertNode(this.root, newNode);
    } else {
      // 根节点是空的，直接创建
      this.root = newNode;
    }
  }
  // 私有方法，插入节点
  #insertNode(root, newNode) {
    // 新节点比根节点小，左子树
    if (newNode.val < root.val) {
      if (root.left === null) {
        root.left = newNode;
        root.left.parent = root;
      } else {
        this.#insertNode(root.left, newNode);
      }
    } else {
      // 新节点比根节点大，右子树
      if (root.right === null) {
        root.right = newNode;
        root.right.parent = root;
      } else {
        this.#insertNode(root.right, newNode);
      }
    }
  }
/**
 * 递归 根据 val 查找节点
 * @param {number} val 需要查找的数值
 * @returns 如果找到返回当前节点的引用，如果未找到返回 undefined
 */
  find(val) {
    if(typeof val !== 'number') throw  newError('不是一个数字');
    let node = this.root;
    while(node) {
      if (node.val < val) {
        node = node.right;
      } else if(node.val > val) {
        node = node.left;
      } else {
        return node;
      }
    }
    return;
  }
};

const tree = new BinarySearchTree()
tree.insertNode([71, 35, 87, 22, 53, 46, 66, 78, 98])
const arr = BinarySearchTree.inorder(tree.root)
console.log(arr) // [ 22, 35, 46, 53, 66,71, 78, 87, 98 ]