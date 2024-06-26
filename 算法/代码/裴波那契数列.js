
  // 裴波那切数列定义：1、1、2、3、5、8、13、21、34....裴波那切定义 f(1) = 1;f(2) = 1; f(n) = f(n-1)+f(n-2);随着数项数增加前一位和后一位数的比例越来越接近黄金比列。0.618
  //方法一：递归 缺点，参数n增大时，出现浏览器假死现象 n 
  function fbl(n){
    if (n<=2){
      return 1;
    }else{
      return fbl(n-1) + fbl(n-2);
    }
  }
  // 方法二：尾调用优化
  function fbl(n,res1=1,res2 =2){
    if(n<=2){
      return res2;
    }else{
      return  fbl(n-1, res2 ,res1+res2);
    }
  }
  console.log(fbl(30));
  // 方法三：迭代
  function fbl(n){
    var res1 = 1;
    var res2 = 1;
    var sum = res2;
    for(i = 2; i<n;i++){
      sum = res1 +res2;
      res1 = res2;
      res2 = sum;
    }
    return sum;
  }
  // 方法四：闭包
  const fbl = function(){
    var men = [0,1];
    const f = function(n){
      var res = men[n];
      if(typeof res === 'number'){
        men[n] = f(n-1)+f(n-2);
        res = men[n];
      }
      return res;
    }
  }
  // 数组1   [1,2,3,4,5],6;
  
  // 数组2   [1,2,4,4,8],7;