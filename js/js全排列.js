// js全排列
// https://www.cnblogs.com/EaVango/p/15526330.html
// 从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，叫做从n个不同元素中取出m个元素的一个排列。当m=n时所有的排列情况叫全排列。

// 如果有m个元素，全排列的可能方式有m!种，即3个元素，有3*2*1=6种。4个元素有4*3*2*1=24种。

// 怎么用算法实现呢，我们可以参照下图，遍历整个数组，取出遍历的元素，放到一个temp数组中，然后把剩余元素递归地继续去做遍历，继续取出元素放到temp中，最后当temp中的元素与原数组长度相同时候，递归结束，temp数组也即是全排列的一种情况。
const arrange = (arr = []) => {
    if (arr.length === 0) {
        return arr;
    }
    let resArr = [];

    /**
     * 实现排列handle
     * tempArr 已排列的
     * leftArr 待排列的
     **/
    let idx = 0;

    function arrangeCb(tempArr, leftArr) {
        idx++;
        if (tempArr.length === arr.length) {
            console.log(`排列完成第${idx}次，[${tempArr}]`);
            resArr.push(tempArr);
        } else {
            leftArr.forEach((item, index) => {
                let temp = [].concat(leftArr);
                temp.splice(index, 1);
                console.log(
                    `第${idx}次排列，已排列：[${tempArr.concat(
                        item
                    )}]，未排列：[${temp}]`
                );
                arrangeCb(tempArr.concat(item), temp);
            });
        }
    }

    arrangeCb([], arr);
    return resArr;
};
// let a = arrange([1,2]);
// console.log(a);

// 第1次排列，已排列：[1]，未排列：[2,3,4]
// 第2次排列，已排列：[1,2]，未排列：[3,4]
// 第3次排列，已排列：[1,2,3]，未排列：[4]
// 第4次排列，已排列：[1,2,3,4]，未排列：[]
// 排列完成第5次，[1,2,3,4]
// 第5次排列，已排列：[1,2,4]，未排列：[3]
// 第6次排列，已排列：[1,2,4,3]，未排列：[]
// 排列完成第7次，[1,2,4,3]
// 第7次排列，已排列：[1,3]，未排列：[2,4]
// 第8次排列，已排列：[1,3,2]，未排列：[4]
// 第9次排列，已排列：[1,3,2,4]，未排列：[]
// 排列完成第10次，[1,3,2,4]
// 以此类推

let arrange1 = (arr = []) => {
    if (arr.length === 0) {
        return arr;
    }
    let resArr = [];
    let idx = 0;

    let arrangeCb = (tempArr, leftArr) => {
        idx++;
        if (tempArr.length === arr.length) {
            console.log(`排列完成第${idx}次，[${tempArr}]`);
            resArr.push(tempArr);
        } else {
            leftArr.forEach((item, index) => {
                let temp = [].concat(leftArr);
                temp.splice(index, 1);
                console.log(
                    `第${idx}次排列，已排列：[${tempArr.concat(
                        item
                    )}]，未排列：[${temp}]`
                );

                arrangeCb(tempArr.concat(item), temp);
            });
        }
    };
    arrangeCb([], arr);
    return resArr;
};
let parenthesis11 = (arr) => {
    let len = arr.length;
    let result = [];
    (function handler(temp, remaind) {
        //最后得到的结果是一个字符串数组
        if (temp.length == len) result.push(temp.join(""));
        console.log(temp, remaind);
        remaind.forEach((item, index) => {
            let cur = [...remaind];
            cur.splice(index, 1);
            console.log('========', item, cur);
            handler(temp.concat(item), cur);
        });
    })([], arr);
    return [...new Set(result)]; //去重
};
console.log(parenthesis11([1, 2]));
