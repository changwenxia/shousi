function debounce(func, wait = 3000, immediate = false) {
	let timeout;
	let debounced = function(...args) {
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!callNow) func.apply(this, args);
		}, wait);

		if (callNow) func.apply(this, args);
	}
	debounced.canceld = function() {
		clearTimeout(timeout);
		timeout = null;
	}
	return debounced;
}
function getUserAction() {
	console.log(111);
	getUserAction.cancel();
}
const handleInput = debounce(getUserAction, 5000)
  handleInput();