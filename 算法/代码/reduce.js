// 数组去重并打印当前元素存在几个


const arr = [1,2,3,4,2,2]
let obj ={};
let val = arr.reduce((cur,next)=>{
  // console.log('cur='+cur);
  // console.log('next='+next);
  // console.log('第一个obj=======================')
 if(!obj[next]){
  cur.push(next);
  obj[next]=1;
 }else{
  obj[next] = obj[next]+1;
 }
  return cur;

},[]);

console.log(obj);

console.log(val);
