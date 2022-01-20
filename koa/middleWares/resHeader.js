module.exports = async(ctx, next) => {
    if (ctx.request.url !== '/favicon.ico') {
        ctx.set("Content-Type", "application/json;charset=utf-8");
        // ctx.response.body = '{"success":true}';
        //跨域设置
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
        await next();
    }
}