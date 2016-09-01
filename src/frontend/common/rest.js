export function emulatePostJSON(url, data) {
    var json = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // xhr.open('POST', url, true);
        // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        // xhr.onreadystatechange = (e) => {...};
        // xhr.onerror = () => reject(new Error("Network Error"));
        // xhr.send(json);

        setTimeout(() => {
            resolve({
                token: data.username
            });
        }, 1000);

        setTimeout(() => {
            reject(new Error("Network Error"));
        }, 5000);
    });
}
