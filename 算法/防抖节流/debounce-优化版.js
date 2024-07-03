var count = 1;
var container = document.getElementById("container");
function getUserAction(e){
  container.innerHTML = count ++;
}
// container.onmousemove=getUserAction;

function debounce(func, wait, immediate) {
  var timeout,result;
  var debounced =  function () {
      var context = this;
      var args = arguments;
      console.log(11, immediate);

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
              timeout = null;
          }, wait)
          if (callNow) result = func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
      return result;
  }
  debounced.cancel = function(){
    clearTimeout(timeout)
    timeout = null;
  }
  return debounced;
}

var setUseAction=function(){
  console.log(123);
  debounce(getUserAction, 3000, true);
};
container.onmousemove = setUseAction;
console.log(document.getElementById("button"));

document.getElementById("button").addEventListener("click", function(){
  console.log(1);
  setUseAction.cancel();
});

