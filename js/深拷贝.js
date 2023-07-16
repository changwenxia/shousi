// 深拷贝，
// 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
// 这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：

// 检查map中有无克隆过的对象
// 有 - 直接返回
// 没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆
function deepCopy(obj, map = new WeakMap()) {
    if (typeof obj !== 'object') {
        return obj;
    }
    if (map.get(obj)) {
        return map.get(obj);
    }

    let cloneObj = Array.isArray(obj) ? []  : {};
    map.set(obj, cloneObj);

    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepCopy(obj[key], map);
        }
    }
    return cloneObj;
} 

const target = {a: 1, b: 2,c:{c1:3}, d: [2,3]};
// const target = {
//     // field1: 1,
//     // field2: undefined,
//     field3: {
//         child: 'child'
//     },
//     field4: [2, 4, 8]
// };
// target.target = target;
const copy1 = deepCopy(target);
target.d = [2,3.4,5];
// console.log(copy1); 
// console.log(target); 