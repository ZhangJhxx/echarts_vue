function debounce(callback, wait = 300) {
    let timeout;
    return function() {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback.apply(this, arguments);
            // console.log(this); //box 函数的调用者
        }, wait);
    }
}
//输入完毕后立即执行，然后等待300ms再执行
function debounce1(callback, wait = 300) {
    let timeout;
    return function() {
        if (timeout) clearTimeout(timeout);
        let callnow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
        if (callnow) callback.apply(this, arguments);
    }
}
//throttle 在设置的n秒内只执行一次函数 settimeout
function throttle(callback, wait = 1000) {
    let timeout;
    return function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                callback.apply(this, arguments);
                timeout = null;
            }, wait)
        }
    }
}
//throttle 在设置的n秒内只执行一次函数 时间戳
function throttle1(callback, wait = 1000) {
    let prev = 0;
    return function() {
        let now = Date.now();
        if (now - prev > wait) {
            callback.apply(this, arguments);
            prev = now;
        }
    }
}
module.exports = debounce;