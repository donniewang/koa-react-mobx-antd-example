const http = require("http");
const path = require("path");
const io = require('socket.io');

var config = require('../../config.json');

const Koa = require('koa');
const app = new Koa();

const logger = require('koa-logger');
const static = require('koa-static');
const views = require('koa-views');
const body = require('koa-body');
const jwt = require('koa-jwt');

var swig = require('swig');
swig.setDefaults({
    varControls: ['<%','%>']
});

app.use(logger());
app.use(static(path.join(__dirname,'../../dist')));
app.use(jwt({ secret:config.jwt.secret }).unless({ path:[/\//] }));
app.use(views(path.join(__dirname,'../../dist'), { map: { html: 'swig' } }));
app.use(body({ multipart: true, formidable: { uploadDir: path.join(__dirname,'../../dist/upload') } }));

const api = require('./routes/api');
app.use(api.routes(),api.allowedMethods());

const web = require('./routes/web');
app.use(web.routes(),web.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

const server = http.createServer(app.callback());
// server.timeout = 1000 * 500;
// const socket = io(server,{ 
//     pingInterval: 5000,
//     pingTimeout: 5000 
// });
// require('./socket')(socket);
server.listen(config.server.port||3000,()=>{
    console.log('server start at '+config.server.port||3000);
});