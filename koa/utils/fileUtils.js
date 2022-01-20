const fs = require('fs');
module.exports.fileReadUtils = (filepath) => {
    return new Promise((resovle, reject) => {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resovle(data);
            }
        })
    })
}