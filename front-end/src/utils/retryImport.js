export function retryImport(fn, retries = 3, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retries === 1) {
                        reject(error);
                        return;
                    }
                    retryImport(fn, retries - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}