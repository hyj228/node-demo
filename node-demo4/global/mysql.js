var mysql = require('mysql');
var dataBase = mysql.createConnection({
    host: 'localhost', // 连接的服务器
    // port:'30200',
    user: 'root', // 用户名
    password: 'huoyanjie', // 用户密码
    database: 'nodedist' // 选择的库
});

dataBase.connect(); // 创建一个mysql的线程
// var sql = 'SELECT * FROM userInfo join goods';
// var addSql = '';
// var modSql = 'UPDATE userInfo SET user = ?,password = ? WHERE id = ?';
// var delSql = 'DELETE FROM userInfo where id=1';

function checkMysql(surface, field, value,params) {
    console.log(surface, field, value,params)
    let checkMysqlHttp = new Promise((resolve, reject) => {
        dataBase.query(`SELECT * FROM ${field}  ${params?'where ' + params:''}`, function (err, result) {
            if (err) {
                return reject(err)
            }
            console.log(err,result)
            return resolve(result)
        });
    })
    return checkMysqlHttp
}
function addMysql(surface, field, value,addSqlParams) {
    console.log(surface, field, value,addSqlParams)
    let addMysqlHttp = new Promise((resolve, reject) => {
        dataBase.query(`INSERT INTO ${field}(${surface}) VALUES(${value})`, addSqlParams, function (err, result) {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        });
    })
    return addMysqlHttp
}
// 删
function delMysql(field, id) {
    let delMysqlHttp = new Promise((resolve, reject) => {
        dataBase.query(`DELETE FROM ${field} where id=${id}`, function (err, result) {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        });
    })
    return delMysqlHttp
}
function editMysql(field,surface,modSqlParams) {
    let editMysqlHttp = new Promise((resolve, reject) => {
        dataBase.query(`UPDATE ${field} SET ${surface} WHERE id = ?`,modSqlParams, function (err, result) {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        });
    })
    return editMysqlHttp
}
// dataBase.end();
module.exports = {addMysql,checkMysql,delMysql,editMysql}