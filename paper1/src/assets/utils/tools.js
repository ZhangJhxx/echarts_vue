function fetchUrl(url, params) {
    const queryArr = [];
    if (params) {
        Object.keys(params).forEach(key => {
            queryArr.push(key + '=' + params[key]);
        })
    }
    if (url.match(/\?/)) {
        url += '&' + queryArr.join('&');
    } else {
        url += '?' + queryArr.join('&');
    }
    return new Promise((resolve, reject) => {
        fetch(url, {
                headers: {
                    Authorization: '563492ad6f91700001000001518d010653104dad858ab7b948a08023'
                }
            })
            .then(res => res.json())
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}
module.exports = fetchUrl;