// 防抖 debounce
function debounce(func, time, immediate) {
    let timeout, res;

    let decounced = function() {
        let _this = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, time);
            if (callNow) res = func.apply(_this, args);
        }
        else {
            timeout = setTimeout(function() {
                func.apply(_this, args);
            }, time)
        }
        return res;
    }
    decounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
    return decounced;
}

function foramt(num) {
    return num && num.replace(/\d{3}/g, '',);
}
foramt(z);