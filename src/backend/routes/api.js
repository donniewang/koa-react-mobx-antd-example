const config = require('../../../config.json');
const crypto = require('crypto');
const service = require('../service');
const moment = require('moment');
const jsonwebtoken = require('jsonwebtoken');
const Sequelize = require('sequelize');

const api = require('koa-router')({
    prefix:'/api/v1'
});

const userAuthorize = async (ctx,next) => {
    let result = {};
    let pass = false;
    try {
        const token = ctx.header.authorization;
        if(!!token) {
            const auth = await jsonwebtoken.verify(token.split(' ')[1],config.jwt.secret);
            if(!!auth.user&&!!auth.user.id) {
                const user = await service.load('User',auth.user.id);
                if(!!user&&!!user.id) {
                    const now = Math.floor(Date.now() / 1000);
                    if(!!auth.exp&&auth.exp>now) {
                        ctx.user = user;
                        pass = true;
                    } else {
                        throw new Error('用户身份已失效');
                    }
                } else {
                    throw new Error('用户身份不合法');
                }
            } else {
                throw new Error('用户身份不合法');
            }
        } else {
            throw new Error('用户身份不合法');
        }
    } catch(e) {
        console.error(moment().format("YYYY-MM-DD HH:mm:ss"),'api','userAuthorize',e);
        result.success = 0;
        result.message = e.message;
    }
    if(pass) {
        await next();
    } else {
        ctx.body = result;
        ctx.type = "json";
    }
}

const noAuthorize = async (ctx,next) => {
    await next();
}

api.post('/user/verify', noAuthorize, async (ctx,next) => {
    let result = {};
    try {
        let param = { ...ctx.request.query, ...ctx.request.body };
        if(!!param&&!!param.username&&!!param.password) {
            let where = { username:param.username }
            let user = await service.get('User',{ where });
            if(!!user) {
                var sha = crypto.createHash('sha');
                sha.update(param.password, 'utf8');
                var encode = sha.digest('hex');
                if(user.password===encode) {
                    result.token = jsonwebtoken.sign({
                        user: { id:user.id },
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
                    }, config.jwt.secret),
                    result.success = 1;
                    result.user = user;
                } else {
                    throw new Error('密码不正确');
                }
            } else {
                throw new Error('用户未找到');
            }
        } else {
            throw new Error('用户名密码不能为空');
        }
    } catch(e) {
        console.error(moment().format("YYYY-MM-DD HH:mm:ss"),'api',e);
        result.success = 0;
        result.message = e.message;
    }
    ctx.body = result;
    ctx.type = "json";
});

api.get('/user/list', noAuthorize, async (ctx,next) => {
    let result = {};
    try {
        let param = { ...ctx.request.query, ...ctx.request.body };
        let { page,size } = param;
        let options = {};
        if(!!page && !!size) {
            options.offset = (page - 1) * size;
            options.limit = size;
        }
        options.where = { };
        options.order = [ ['id','ASC'] ];
        result = await service.list('User',options);
        result.success = 1
    } catch(e) {
        console.error(moment().format("YYYY-MM-DD HH:mm:ss"),'api','/user/list',e);
        result.success = 0;
        result.message = e.message;
    }
    ctx.body = result;
    ctx.type = "json";
});

api.post('/user/create', userAuthorize, async (ctx,next) => {
    let result = {};
    try {
        let param = { ...ctx.request.query, ...ctx.request.body };
        let row = await service.create('User',param);
        if(!!!row) {
            throw new Error('数据创建失败');
        }
        result.row = row;
        result.success = 1;
    } catch(e) {
        console.error(moment().format("YYYY-MM-DD HH:mm:ss"),'api','/user/create',e);
        result.success = 0;
        result.message = e.message;
    }
    ctx.body = result;
    ctx.type = "json";
});

api.post('/user/update', userAuthorize, async (ctx,next) => {
    let result = {};
    try {
        let param = { ...ctx.request.query, ...ctx.request.body };
        const { id } = param;
        if(!!!id) {
            throw new Error('数据主键为空');
        }
        let where = { id };
        delete param.id;
        result = await service.update('User',{ where },param);
        result.success = 1;
    } catch(e) {
        console.error(moment().format("YYYY-MM-DD HH:mm:ss"),'api','/user/update',e);
        result.success = 0;
        result.message = e.message;
    }
    ctx.body = result;
    ctx.type = "json";
});

api.post('/user/remove', userAuthorize, async (ctx,next) => {
    let result = {};
    try {
        let param = { ...ctx.request.query, ...ctx.request.body };
        const { id,ids } = param;
        let where = {};
        if(!!id) {
            where.id = id;
        } else if(!!ids) {
            where.id = { [Sequelize.Op.in]:ids };
        }
        result = await service.remove('User',{ where });
        result.success = 1;
    } catch(e) {
        console.error(moment().format("YYYY-MM-DD HH:mm:ss"),'api','/user/remove',e);
        result.success = 0;
        result.message = e.message;
    }
    ctx.body = result;
    ctx.type = "json";
});

module.exports = api;