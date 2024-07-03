// 传统方式实现
window.onload = lazyImgsActions;
function lazyImgsActions() {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    if (lazyImgs.length === 0) {
        return;
    }

    const scrollTop = document.documentElement.scrollTop;
    const wh = window.innerHeight;
    lazyImgs.forEach(item => {
        if (item.offsetTop <= (scrollTop + wh)) {
            item.src = item.getAttribute('data-src');
            item.removeAttribute('data-src');
        }
    })

}
// getBoundingRect方式
function lazyImgByGetBoundingClientRect() {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    if (lazyImgs.length === 0) {
        return;
    }

    const wh = window.innerHeight;
    lazyImgs.forEach(item => {
        const container = item.getBoundingClientRect();
        if (container.top <= wh) {
            item.src = item.getAttribute('data-src');
            item.removeAttribute('data-src');
        }
    })
}
 // observer方式
function lazyImgsByIntersectionObserver() {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    if (lazyImgs.length === 0) {
        return;
    }

    const ob = new IntersectionObserver(entries => {
        entries.forEach(item => {
            const container = item.target;
            if (item.isIntersecting) {
                container.src = container.getAttribute('data-src');
                container.removeAttribute('data-src');
                ob.unobserve(container);
            }
        })
    })
    lazyImgs.forEach(item => ob.observe(item));
}

