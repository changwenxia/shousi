var count = 1;
var container = document.getElementById("container");
function getUserAction(e){
  container.innerHTML = count ++;
}

function debounce(func, wait) {
  var timeout;
  return function(){
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
container.onmousemove = debounce(getUserAction, 1000);
// debounce(getUserAction, 1000);