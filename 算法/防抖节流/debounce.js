var count = 1;
function getUserAction () {
  count++;
}

function debounce(func, wait) {
  var timeout;
  return function(){
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
debounce(getUserAction, 1000);