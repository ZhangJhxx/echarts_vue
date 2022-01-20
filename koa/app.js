const koa = require('koa');

const app = new koa();
const resHeader = require('./middleWares/resHeader');
const resFile = require('./middleWares/resFile');
app.use(resHeader);
app.use(resFile);

app.listen(8080);