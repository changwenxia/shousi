function bucketSort(arr) {
	const max = Math.max(...arr);
	let bucket = new Array(max + 1).fill(0),
        sortedIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
	console.log(bucket);
    for (let j = 0; j < max + 1; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
    return arr;
}

let arr = [4, 2, 2, 8, 3, 3, 1]
console.log(bucketSort(arr));