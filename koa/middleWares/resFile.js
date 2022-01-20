const path = require("path");
const fileUtils = require("../utils/fileUtils");
module.exports = async(ctx, next) => {
    //访问的地址 /DPPH
    const url = ctx.request.url; // /DPPH
    let filepath = '../data' + url + '.json';
    filepath = path.resolve(__dirname, filepath);
    let res = await fileUtils.fileReadUtils(filepath);
    ctx.response.body = res;
    await next();
}