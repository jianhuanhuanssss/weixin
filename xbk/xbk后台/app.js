//app.js
//1:加载相应模块
const express = require("express");
const pool = require("./pool");
//2:创建express对象
var app = express();
app.use(express.static(__dirname+"/public"));
app.listen(3008);
app.get("/getList",(req,res)=>{
    var sql = `SELECT * FROM index1`;
	pool.query(sql,[],(err,result)=>{
		if(err) throw err;
		res.send({code:1,message:result});
	})
});
app.get("/getDetails",(req,res)=>{
	var did = req.query.did;
	var sql = `SELECT * FROM details WHERE did = ?`;
	pool.query(sql,[did],(err,result)=>{
		if(err) throw err;
		res.send({code:1,message:result});
	})
});
app.get("/getshopCar",(req,res)=>{
	var sid = req.query.sid;
	var sql = `SELECT * FROM shopcar WHERE sid = ?`;
	pool.query(sql,[sid],(err,result)=>{
		if(err) throw err;
		res.send({code:1,message:result});
	})
})