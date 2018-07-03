const config = require('../../../config.json');
const moment = require('moment');

let web = require('koa-router')({
    prefix:'/'
});

web.get('*',async (ctx,next) => {
    await ctx.render('index',{  });
});

module.exports = web;