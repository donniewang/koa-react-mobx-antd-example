const database = require('../database');

exports.load = async (model,id) => {
    return await database[model].findById(id);
}

exports.get = async (model,options) => {
    return await database[model].findOne(options);
}

exports.list = async (model,options) => {
    return await database[model].findAndCountAll(options);
}

exports.create = async (model,obj) => {
    return await database[model].create(obj);
}

exports.remove = async (model,options) => {
    return await database[model].destroy(options);
}

exports.update = async (model,options,obj) => {
    let orm = await database[model].findOne(options);
    return await database[model].update({ ...orm,...obj },options);
}