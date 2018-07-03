const Sequelize = require('sequelize');
const config = require('../../config.json');
const { database } = config;
const { db,user,password } = database;

const sequelize = new Sequelize(db,user,password,database);

const User = sequelize.define('user',{
    id:{ type:Sequelize.BIGINT,primaryKey:true,autoIncrement:true,field:'id' },
    name:{ type:Sequelize.STRING,field:'name' },
    username:{ type:Sequelize.STRING,field:'username' },
    password:{ type:Sequelize.STRING,field:'password' },
    description:{ type:Sequelize.TEXT,field:'description' },
    mobile:{ type:Sequelize.STRING,field:'mobile' },
    updateTime: { type: Sequelize.STRING,field:'update_time' }
},{
    tableName:'t_user',
    timestamps: false
});

sequelize.sync();

module.exports = {
    Sequelize,
    sequelize,
    User
}