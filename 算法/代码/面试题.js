 // 设置一个长度是m，内容都是n得数组
 function setArr(m, n) {
  //  return  new Array(m).fill(n);
  const arr = [];

  function add(m, n) {
    if (arr.length === m) return arr;
    arr.push(n);
    add(m, n)
  }
  add(m, n);
  return arr;
}
var arr = setArr(3, 2)
console.log(arr);

// null和undefined区别
var a;
var b=()=>{
 console.log(a);
 if(a!== null || typeof a!=="undefined"){
   console.log("true");
   return;
 }
 console.log("false");
}
b();
// 截断字符串（用瑞兹来截断对面的退路）
//如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。
//切记，插入到字符串尾部的三个点号也会计入字符串的长度。
// 但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。
function truncate(str, num) {
  // 写法1
  // if (str.length > num) {
  //   const length = str.length - num >= 30 ? num - str.length - 3 : num - str.length;
  //   return str.slice(0, length) + "...";
  // }
  // 写法2
  var result='';
  if (str.length<=num) {
    result=str;
  } else {
    result= num > 3 ? str.slice(0, num-3) + '...' : str.slice(0, num)+'...';
  }
  return result;
}
// truncate("A-tisket a-tasket A green and yellow basket", 11);
// 猴子吃香蕉可是掰成好几段来吃哦！
//把一个数组arr按照指定的数组大小size分割成若干个数组块。
// 例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];
// chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];
function chunk(arr, num) {
  let arr1 = [];
  for (let i = 0; i < arr.length; i += num) {
    let arr2 = arr;
    arr1.push(arr2.slice(i, i + num))
  }
  return arr1;
}
//比较字符串（蛤蟆可以吃队友，也可以吃对手）  如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。
// 举例，["hello", "Hello"]应该返回true，因为在忽略大小写的情况下，第二个字符串的所有字符都可以在第一个字符串找到。
// ["hello", "hey"]应该返回false，因为字符串"hello"并不包含字符"y"。
// ["Alien", "line"]应该返回true，因为"line"中所有字符都可以在"Alien"找到。
function mutation(arr) {
  let arr1 = arr[0].toLowerCase(),
    arr2 = arr[1].toLowerCase();
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) === -1) {
      return false;
    }
  }
  return true;;
};
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
// 金克斯的迫击炮！实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。
// destroyer([1, 2, 3, 1, 2, 3], 2, 3) 应该返回 [1, 1].
// destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3) 应该返回 [1, 5, 1].
// destroyer([3, 5, 1, 2, 2], 2, 3, 5) 应该返回 [1].
// destroyer([2, 3, 2, 3], 2, 3) 应该返回 [].
// destroyer(["tree", "hamburger", 53], "tree", 53) 应该返回["hamburger"].
function destroyer(arr) {
  return arr.filter(val => {
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i] === val) return false;
    }
    return true;
  })
}
// 先给数组排序，然后找到指定的值在数组的位置，最后返回位置对应的索引。
// 举例：where([1,2,3,4], 1.5) 应该返回1。因为1.5插入到数组[1,2,3,4]后变成[1,1.5,2,3,4]，而1.5对应的索引值就是1。
// 同理，where([20,3,5], 19) 应该返回 2。因为数组会先排序为 [3,5,20]，19插入到数组[3,5,20]后变成[3,5,19,20]，而19对应的索引值就是2。
function where(arr, num) {
  arr.sort((a, b) => {
    return a - b;
  })
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= num) return i;
  }
}
//移位密码也就是密码中的字母会按照指定的数量来做移位。一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔ 'O'，以此类推。

// 写一个ROT13函数，实现输入加密字符串，输出解密字符串。
// 所有的字母都大写，不要转化任何非字母形式的字符(例如：空格，标点符号)，遇到这些特殊字符，跳过它们。
// 1、26个字母的unicode码在65(A)与90(Z)之间,第13位M(77);
// 2、将str通过.charCodeAt()转为unicode编码并放入新数组;
//   其中非字母形式的字符直接放入.charAt();
//   后13位字母减去13后放入；
//   前13位字母加上13后放入；
//   通过.fromCharCode()转化为字母，将数组转化为字符串；
// rot13("SERR PBQR PNZC") 应该解码为 "FREE CODE CAMP"
// rot13("SERR CVMMN!") 应该解码为 "FREE PIZZA!"
// rot13("SERR YBIR?") 应该解码为 "FREE LOVE?"
// rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.") 应该解码为 "THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX."
function rot13(str) {
    //定义一个数组，用来存放解密后的字符
    var newArr = [];
    //遍历参数字符串
    for (var i = 0; i < str.length; i++) {
        // 非字母形式的字符，直接跳过，存入数组newArr中
        if (str.charCodeAt(i) < 65 || str.charCodeAt(i) > 90) {
            newArr.push(str.charAt(i));
        } else if (str.charCodeAt(i) > 77) {
            // 后13个大写字母，减去13
            newArr.push(String.fromCharCode(str.charCodeAt(i) - 13));
        } else {
            // 前13个大写字母，加上13 
            newArr.push(String.fromCharCode(str.charCodeAt(i) + 13));
        }
    }
    return newArr.join("");
}

// 已知如下数组：
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
function sortArr(arr) {
  return Array.from(new Set(arr.flat(Infinity).sort((a, b) => {
    return a - b;
  })));
}
// console.log(sortArr([ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]));
// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
function uniqueArr(arr1, arr2) {
  return [...arr1, ...arr2].sort((a, b) => {
    return a.charCodeAt() - b.charCodeAt()
  })
}
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'],
  arr2 = ['A', 'B', 'C', 'D']
uniqueArr(arr1, arr2);

function Foo() {
  getName = function () {  console.log(1); };
  return this;
}
Foo.getName = function () {  console.log(2); };
Foo.prototype.getName = function () {  console.log(3); };
var getName = function () {  console.log(4);  };

function getName() {  console.log(5); }

//请写出以下输出结果：
Foo.getName(); // 2
getName();     //  4
Foo().getName();  // 1
getName();   // 1
new Foo.getName(); //2
new Foo().getName(); // 3
new new Foo().getName(); // 3