function MyPromise(executor) {
    this.status = 'pending';
    this.result = null;
    this.reason = null;
    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];

    function resolve(data) {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = 'fulFilled';
                this.result = data;
                this.onFulFilledCallbacks.forEach(callback => callback(data));
            }
        })
    }


    function reject(reason) {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        })
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = 
}