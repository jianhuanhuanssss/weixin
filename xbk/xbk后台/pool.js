//17:23~17:26
//1:加载模块 mysql
const mysql = require("mysql");
//2:创建连接池对象
var pool = mysql.createPool({
    host:"127.0.0.1",   //连接mysql数据库地址
    user:"root",        //连接mysql数据库 用户名
    password:"",        //连接mysql数据库 密码
    database:"xbk", //操作哪个数据库
    port:3306,          //端口号3306
    connectionLimit:10  //活动连接数量
});
//3:导出
module.exports = pool;