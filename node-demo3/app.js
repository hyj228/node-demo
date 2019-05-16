
let Koa = require('koa');
let app = new Koa();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',	// 连接的服务器
    // port:'30200',
	user: 'root',	// 用户名
	password: 'huoyanjie',	// 用户密码
	database: 'nodedist'	// 选择的库
});

connection.connect();	// 创建一个mysql的线程
var  sql = 'SELECT * FROM userInfo join goods';
// 查
connection.query(sql, (err, results, fields) => {
	if (err) {
		throw  err;
	};

	console.log('The solution is:', results);	// 返回第一条记录的solution列的内容
});
// connection.end();
var  addSql = 'INSERT INTO userInfo(id,user,password) VALUES(0,?,?)';
var  addSqlParams = ['菜鸟工具', 12];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
var modSql = 'UPDATE userInfo SET user = ?,password = ? WHERE id = ?';
var modSqlParams = ['菜鸟移动站', 12121,1];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

var delSql = 'DELETE FROM userInfo where id=1';
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});

app.listen(9090,()=>{
    console.log('90990')
})