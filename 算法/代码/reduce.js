// 数组去重并打印当前元素存在几个
const a = arr => {
	let obj = {};
	let res = arr.reduce((cur, next) => {
		if (!obj[next]) {
			cur.push(next);
			obj[next] = 1;
		} else {
			obj[next]++;
		}
		return cur;
	}, []);
	return {
		findNumber: obj, 
		filterArr: res
	};
}
console.log(a([1,2,3,4,2,2]));
