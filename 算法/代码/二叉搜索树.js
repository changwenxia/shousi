// 二叉搜索树满足一下几个性质：
    // 1，若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
    // 2，若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
    // 3，若任意节点的左、右子树也需要满足左边小右边大的性质
  // 二叉树搜索树的链式存储结构 二叉搜索树的节点通常包含四个域，数据元素，分别指向左、右节点的指针和一个指向父节点的指针，一般把这种存储结构成为三叉链表。
  // 代码初始化一个二叉搜索树的节点：
  class BinaryTreeNode {
    constructor(key,value){
      this.parent = null; //指向父节点的指针
      this.left = null; //指向左节点的指针
      this.right = null; //指向右节点的指针
      this.value = value; //一个数据元素，可以是一个key和value
    }
  }
  // 代码初始化一个二叉搜索树：
  class BinarySearchTree{
    constructor(){
      this.root = null;
    }
    static createNode(key,value){
      return new BinarySearchTree(key,value);
    }
  }
  // 定义两个指针，分别是p和tail，最初都指向root，p是用来指向要插入的位置的父节点的指针，而tail是用来查找插入位置的，所以最后它会指向null，举个例子，根据二叉树原理，当p指向了某个最后的节点，而tail最后指向了null（tail为null则说明已经找到了要插入的位置）。循环，tail根据我们上面分析的一步一步往下找位置插入，如果比当前节点小就往左找，大则往右找，一直到tail找到一个空位置也就是null。如果当前的root为null，则说明当前结构中并没有节点，所以插入的第一个节点直接为跟节点，即this.root = node将插入后的节点的parent指针指向父节点
