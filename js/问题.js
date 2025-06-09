`
1.js如何实现异步执行？为什么要出现异步执行机制？
js是单线程的，比如浏览器很多操作会很耗时，如网络请求、读取文件等。如果采用同步执行方式，在这些操作完成之前，整个程序会被阻塞。
异步执行机制允许这些耗时操作在后台进行，让程序可以继续执行其他任务，从而提高用户体验和资源利用率。异步执行机制可以让多个网络请求并发进行，而不是一个一个顺序执行，提升性能和用户体验，
异步执行：
callback:回调函数：基本异步编程方式。例如setTimeout。
promise:
async/await:更简洁的异步编程方式，它建立在Promise之上，让异步代码看起来更像同步代码。

1.简述一下定时器的执行顺序或机制？
   js定时器通过事件循环的宏任务队列管理，执行顺序受同步代码和微任务影响，实际延迟可能大于设定值。

2.尽量详细描述下html页面的展现流程。什么是重排和重绘？什么时候会导致重排或重绘？
3.用css实现一个正方形，宽度为父级宽度的50%？
4.描述下你对webworker的理解？如果没了解过，可以挑选另外你觉得你学到的比较新的技术。
6.基于原生js实现一个可以发送远程请求的函数，要求返回格式为Promise。
8.简述es5与es6继承方式的不同点？
   语法差异：ES5 用构造函数+原型链，ES6 用 class/extends
   关键区别：
      ES6 强制 super() 调用；
      ES6 自动处理原型链和静态继承；
      ES6 支持内置对象继承；
   补充原理：ES6 本质是语法糖，但解决了 ES5 的多个痛点（如需在子类构造函数中显式调用父类构造函数、手动连接原型链、需手动复制父类静态方法、无法完整继承内置对象如Array）；
9.将一个整形数组A作为参数传递给一个函数B，B函数内部修改传参进来的
整形数组的第一个数组元素值，执行完B函数后，数组A中的元素的值是否发生变化？解释其原因。
   会变化，
   在js中，当数组作为参数传递时，函数内部通过引用直接操作原始数组的内存空间。因此修改数组元素会影响原数组，但如果对参数重新赋值（而非修改元素），则会断开引用关系。这与基本类型的值传递有本质区别

2.尽量详细描述下从用户输入网站后到网站整体呈现的详细过程？
3.用css实现未知宽高的固定居中的div？（尽可能多种方法）
4.描述下你对PWA的理解？如果没了解过，可以挑选另外你觉得你学到的比较新的技术。
定义：
   PWA是一种结合网页和原生应用优势的应用程序类型。本质上是网页应用，在体验上可以像原生应用一样。从技术角度看，它利用一系列现代 Web API 和标准，如 Service Workers、Web App Manifest 等。
核心技术和特性：
   Service Workers
      这是 PWA 的核心技术之一。Service Workers 是一种在后台运行的脚本，独立于网页主线程。它就像一个介于网络和浏览器之间的代理服务器。例如，它可以拦截和处理网络请求，实现离线缓存。
      比如，一个新闻类 PWA 应用可以使用 Service Workers 在用户在线时缓存新闻内容。当用户进入没有网络的环境中，仍然可以浏览之前缓存的新闻文章，提供了更好的离线体验。
   Web App Manifest
      这是一个 JSON 文件，用于告诉浏览器关于 PWA 的相关信息，如应用名称、图标、启动方式等。它使得 PWA 能够被添加到用户的主屏幕上，并且在启动时可以隐藏浏览器的 UI，给用户一种类似原生应用的启动体验。
      以一个购物类 PWA 为例，通过 Web App Manifest 配置合适的图标，用户可以将其添加到主屏幕，点击图标启动时，看到的是一个没有浏览器地址栏等元素干扰的购物界面，就像打开一个原生购物应用一样。
   响应式设计
      PWA 需要能够在各种设备上提供良好的用户体验，包括手机、平板、桌面电脑等。响应式设计确保了应用的布局和功能能够根据设备的屏幕大小、分辨率等因素进行自适应调整。
      例如，一个 PWA 版的日程管理应用，在手机上可以以垂直滚动的方式展示日程列表，而在平板上可以采用分栏布局，同时显示日程列表和详细信息，在桌面电脑上可能会有更宽的布局，展示更多的日程细节和功能按钮。
优势：
   跨平台性
      PWA 可以在任何支持现代浏览器的设备上运行，无需针对不同的操作系统（如 iOS、Android）进行单独开发。这大大降低了开发成本和时间。例如，一个企业内部的工作流程 PWA，员工可以在公司发放的各种设备（包括不同品牌的手机和平板）上使用，只要有浏览器支持即可。
   易于更新和维护
      由于 PWA 是基于 Web 技术，更新时只需要更新服务器上的代码，用户下次访问或刷新应用时就可以获取到最新版本。与原生应用需要用户下载和安装更新包相比，更新过程更加简单快捷。比如，一个金融类 PWA 应用更新了安全功能或界面设计，用户不需要像更新原生应用那样手动下载更新，减少了更新的阻力。
   良好的用户体验
      结合了离线功能、类似原生应用的启动和交互体验，以及响应式设计，PWA 能够提供高质量的用户体验。例如，一个旅游攻略类 PWA，用户在旅行途中即使没有网络，也可以查看之前缓存的景点信息、地图等，并且可以方便地从主屏幕启动应用，在应用内进行流畅的操作。

5.对于有图片列表的页面，如何优化这个页面的性能？
   图片格式选择与压缩：格式优化、压缩处理、
   图片懒加载(为图片加自定义属性如data-src存储真实图片源地址，通过js监听页面滚动 图片进入视口时将data-src中的地址赋值给src来加载图)
   响应式图片,根据不同设备的屏幕分辨率和尺寸提供最合适的图片版本，
   使用内容分发网络（CDN）
   图片缓存策略优化：合理的缓存策略可以避免重复下载相同的图片，从而加快页面的再次加载速度。浏览器会根据服务器返回的缓存指令来决定是否重新获取图片

6.基于原生js实现JSONP函数。

7.如何让一个函数具备执行过程中被打断的能力（es6|es7）？
  1.使用 Generator 函数（ES6）实现可中断执行
      Generator 函数的基本原理
      Generator 函数是一种特殊的函数，它可以暂停和恢复执行。它通过function*语法来定义。在函数内部，使用yield关键字来暂停函数的执行，并返回一个中间结果。当再次调用next()方法时，函数会从上次yield的地方继续执行。
   2.使用async/await结合Promise（ES7 及以上）实现类似可中断效果（更面向异步场景）

8.列举和说明下你理解es5的几种继承方式？
9.请用js实现深复制。
10.你最熟悉react|vue|angular中的哪一种？挑选其中一种，尽可能详细地说明下你对这个框架的使用方法和原理理解。（例如：组件，组件输入，组件输出，父子及中央通信方式，生命周期钩子，数据视图绑定及其原理等）


编程题：请使用Javascript或者Typescript语言实现函数，满足以下功能需求，选做一题
1.返回斐波那契数列的第n个值的函数
（注: 斐波那契数列由0和1开始，之后的费波那契系数就是由之前的两数相加而得出）
3.爬楼梯，有n节楼梯，每次能爬1或者2个台阶，寻找爬完n阶楼梯的不同中方法数
   例1： n = 2;  （1+1， 2）输出： 2  
   例2 :  n = 3;  （1+1+1， 1+2， 2+1）输出： 3
   总结：都是斐波那契数列问题
function fibonacci(n) {
	if (n === 1 || n === 2) return n;
	return fibonacci(n-1) + fibonacci(n-2)
}
console.log(fibonacci(2));

2.寻找重复元素， 在整型数组中， 判断是否存在重复的元素；
例1： 数组A [1, 3, 4, 5, 6] 输出false
例2： 数组B [2, 3, 5, 3, 7, 8, 3] 输出 true

function findRepeat(arr) {
	let res = new Set();
	for(let num of arr) {
		if (res.has(num)){
			return true;
		}
		res.add(num)
	}
	return false;
}
console.log(findRepeat([1, 3, 4, 5, 6]));
console.log(findRepeat([2, 3, 5, 3, 7, 8, 3]));
 
编程题：请使用Javascript或者Typescript语言实现函数，满足以下功能需求，选做一题
1.寻找单数，整数集合中有2n+1个数，其中有2n个数两两相同，寻找剩下的单数；
例如 [2, 3, 6, 1, 3, 6, 1], 输出：2
// 方法一：哈希表统计法,  时间复杂度 O(n)，空间复杂度 O(n) ,通用场景
function findNumber1(nums) {
	const map = new Map();
	for(const num of nums) {
		map.set(num, (map.get(num) || 0) + 1);
	}
	for(const [num, count] of map) {
		if (count === 1) return num;
	}
}
// 方法二：位运算（最优解）,   时间复杂度 O(n)，空间复杂度 O(1),最优解（推荐）
// 异或(XOR)特性：
// 1. a ^ a = 0       (相同数异或为0)
// 2. a ^ 0 = a       (任何数与0异或不变)
// 3. 满足交换律/结合律

// 示例计算过程：
// [2,3,6,1,3,6,1] → 2^3^6^1^3^6^1
// = 2^(3^3)^(6^6)^(1^1) 
// = 2^0^0^0
// = 2
function findNumber(nums) {
	return nums.reduce((acc, num) => acc ^ num, 0)
}
// 方法三：数学计算法,   时间复杂度 O(n)，空间复杂度 O(n), 需要额外数学推导
function findSingleNumber(nums) {
	const uniqueSum = [...new Set(nums)].reduce((a,b) => a + b, 0);
	const totalSum = nums.reduce((a,b) => a + b, 0);
	return 2 * uniqueSum - totalSum;
}
// 方法四：排序比较法,  时间复杂度 O(n log n)，空间复杂度 O(1),数据量小时可以考虑
function findSingleNumber1(nums) {
	nums.sort();
	for(let i=0;i<nums.length;i+=2) {
		if (nums[i] !== nums[i+1]) return nums[i];
	}
}
console.log(findSingleNumber1([2, 3, 6, 1, 3, 6, 1]));

2.反转链表，将链表中元素顺序颠倒反转；
例如 1->3->7->9, 链表形式输出 9->7->3->1
// 方法1 迭代法,时间复杂度 O(n)，空间复杂度 O(1)
function reverseList(head) {
	let prev = null;
	let current = head;
	while (current) {
	  const next = current.next;  // 保存下一个节点
	  current.next = prev;        // 反转当前节点的指针
	  prev = current;             // prev向前移动
	  current = next;             // current向前移动
	}
	return prev;  // prev最终指向新的头节点
}
//  方法2 递归法,时间复杂度 O(n)，空间复杂度 O(n)
//  function reverseList(head) {
// 	if(!head || !head.next) {
// 		return head;
// 	}

// 	const newHead = reverseList(head.next);
// 	head.next.next = head;
// 	head.next = null;
// 	return newHead;
// }


class ListNode {
	constructor(val, next = null) {
	  this.val = val;
	  this.next = next;
	}
  }
// 构建链表 1->3->7->9
const list = new ListNode(1, 
	new ListNode(3, 
	new ListNode(7, 
	new ListNode(9))));

// 反转链表
const reversedList = reverseList(list);

// 打印结果
function printList(head) {
	let current = head;
	const values = [];
	while (current) {
		values.push(current.val);
		current = current.next;
	}
	console.log(values.join("->"));
}

printList(reversedList);  // 输出: 9->7->3->1

3.合并数组，有序非零数组A，B；数组A中元素个数m，数组B中元素个数n; 假设数组A有足够空间存储数组B的元素，A中多余空间元素置零，将A，B中的元素排序后合并到A数组中；
例如：A：[2, 4, 8, 9, 0, 0, 0, 0]  B : [1, 2, 3, 5]  
输出：A : [1, 2, 2, 3, 4, 5, 8, 9]
// 方法解析
逆向处理：从数组末尾开始填充，避免元素覆盖
双指针比较：比较A和B当前最大的元素
剩余元素处理：如果B有剩余元素直接复制

其他解法对比：
方法	时间复杂度	空间复杂度	缺点
合并后排序	O((m+n)log(m+n))	O(1)	未利用已有序特性
额外空间+正向双指针	O(m+n)	O(m+n)	需要额外空间
逆向双指针（最优）	O(m+n)	O(1)	无额外空间，效率最高

function mergeSortedArrays(A, m, B, n) {
	let aIndex = m - 1;  // 数组A有效元素的最后索引
	let bIndex = n - 1;   // 数组B的最后索引
	let mergeIndex = m + n - 1; // 合并后的最后位置索引
	// 从后向前比较并填充
	while (aIndex >= 0 && bIndex >= 0) {
	  if (A[aIndex] > B[bIndex]) {
		A[mergeIndex--] = A[aIndex--];
	  } else {
		A[mergeIndex--] = B[bIndex--];
	  }
	}
	// 如果数组B还有剩余元素
	while (bIndex >= 0) {
	  A[mergeIndex--] = B[bIndex--];
	}
	return A;
  }

const A = [2, 4, 8, 9, 0, 0, 0, 0];
const B = [1, 2, 3, 5];
const m = 4; // A中有效元素个数
const n = 4; // B中元素个数

console.log(mergeSortedArrays(A, m, B, n)); 
// 输出: [1, 2, 2, 3, 4, 5, 8, 9]

初始状态:
A: [2,4,8,9,0,0,0,0]
B: [1,2,3,5]
aIndex=3(A的最后一个有效元素), bIndex=3(B的最后), mergeIndex=7(结果数组最后)

步骤1: A[3](9) > B[3](5) → A[7]=9, aIndex=2,mergeIndex=6
A: [2,4,8,9,0,0,0,9]

步骤2: A[2](8) > B[3](5) → A[6]=8, aIndex=1,mergeIndex=5
A: [2,4,8,9,0,0,8,9]

步骤3: A[1](4) < B[3](5) → A[5]=5, bIndex=2,mergeIndex=4
A: [2,4,8,9,0,5,8,9]

步骤4: A[1](4) > B[2](3) → A[4]=4, aIndex=0,mergeIndex=3
A: [2,4,8,9,4,5,8,9]

步骤5: A[0](2) == B[2](3) → A[3]=3, bIndex=1,mergeIndex=2
A: [2,4,8,3,4,5,8,9]

步骤6: A[0](2) > B[1](2) → A[2]=2, bIndex=0,mergeIndex=1
A: [2,4,2,3,4,5,8,9]

步骤7: A[0](2) > B[0](1) → A[1]=2, bIndex=-1,mergeIndex=0
A: [2,2,2,3,4,5,8,9]

步骤8: B还有元素 → A[0]=1, bIndex=-1,mergeIndex=-1
A: [1,2,2,3,4,5,8,9]

`