const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const Excel = require('exceljs');
const path = require('path')
const axios = require('axios');
var workbook = new Excel.Workbook();
// workbook.creator = 'Me';
// workbook.lastModifiedBy = 'Her';
// workbook.created = new Date(1985, 8, 30);
// workbook.modified = new Date();
// workbook.lastPrinted = new Date(2016, 9, 27);
// // var sheet = workbook.addWorksheet('My Sheet');
// var sheet = workbook.addWorksheet('My Sheet', {
//     properties: {
//         tabColor: {
//             argb: 'FFC0000'
//         }
//     }
// });
// var worksheet = workbook.getWorksheet('My Sheet');
// logger

// app.use(async (ctx, next) => {
//     console.log('dfghj12121kl')
//     await next();
//     const rt = ctx.response.get('X-Response-Time');
//     console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// x-response-time

// app.use(async (ctx, next) => {

// });

// response
let dataCol = [{
    header: '姓名',
    key: 'name',
    width: 10
}, {
    header: '姓名',
    key: 'name2',
    width: 10
}, {
    header: '姓名',
    key: 'name3',
    width: 10
}, {
    header: '姓名',
    key: 'name2',
    width: 10
}, {
    header: '姓名',
    key: 'name3',
    width: 10
}, {
    header: '姓名',
    key: 'name2',
    width: 10
}, {
    header: '姓名',
    key: 'name3',
    width: 10
}, {
    header: '姓名',
    key: 'name2',
    width: 10
}, {
    header: '姓名',
    key: 'name3',
    width: 10
}, {
    header: '姓名',
}, {
    header: '姓名',
    key: 'name3',
    width: 10
}, {
    header: '姓名',
    key: 'name2',
    width: 10
}, {
    header: '姓名',
    key: 'name3',
    width: 10
}];
let dataRow = []
var row = [
    '订单号',
    '下单时间',
    '买家昵称',
    '商品名称',
    '规格',
    '数量',
    '售后',
    '小计',
    '运费',
    '状态',
    '姓名',
    '电话',
    '地址',
    '商品留言'
];
var fileName = `test${new Date().getTime()}.xlsx`; //生成的文件名
fpath = path.join(__dirname, './download/' + fileName) //文件存放路径
// var ws = workbook.xlsx.readFile(fpath).then(worksheet => {
//     return worksheet._worksheets[1];
// }).catch(() => {
const worksheet = workbook.addWorksheet('订单列表');
worksheet.addRow(row);
// return worksheet;
// });
app.use(async ctx => {
    axios({
        method: 'get',
        url: `https://idol-was-qa1.youfenba.com/api/activity/list?page=1&page_size=10`,
    }).then(res => {
        console.log(res.data.data.data, '/')
        res.data.data.data.map((e, i) => {
            e.data.map((el, ei) => {
                worksheet.addRow([el.brand_name, el.company, el.start_at, el.goods_name, el.goods_id, el.recommendation, el.status_name, el.created_at,el.brand_name, el.company, el.start_at, el.goods_name, el.goods_id, el.recommendation]);
            })
        })
        workbook.xlsx.writeFile(fpath) //将workbook生成文件
            .then(function (res, err) {
                console.log(fileName)
                //文件生成成功后执行的操作，这里是将路径返回客户端，你可以有自己的操作
                //   res.send({filePath:fileName})
            });
    }).catch(e => {
        console.log(e, '/')
    });

    ctx.body = 'Hello World';
});
// 判断文件是否存在
// fs.access('file.txt', fs.constants.F_OK, (err) => {
//     console.log(`${'file.txt'} ${err ? '不存在' : '存在'}`);
// });
// 打开文件
// fs.open('./file.txt', 'r', (err, fd) => {
//     console.log(fd,err,'/')
//   if (err) throw err;
//   fs.fstat(fd, (err, stat) => {
//       console.log(stat)
//     if (err) throw err;
//     // 使用文件属性。

//     // 始终关闭文件描述符！
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });
// });
// 为文件追加数据 如果文件不存在就创建
// fs.appendFile('message.txt', '你好，这是第二次追加的数据', (err) => {
//     if (err) throw err;
//     console.log('数据已追加到文件');
//   });



// workbook.views = [
//     {
//       x: 0, y: 0, width: 10000, height: 20000,
//       firstSheet: 0, activeTab: 1, visibility: 'visible'
//     }
//   ]

// data.map((el)=>{
//     console.log(el)
//     worksheet.addRow(el);
//     // el.name=dataCol
// })
// worksheet.addRow([1, 2, 3, 3, 4, 5])
// dataCol.map((el, i) => {
//     console.log(i)
//     worksheet.getColumn(i + 1).values = dataCol;
// })
// 读取文件
// workbook.xlsx.readFile('./download/test.xlsx')
//     .then(function (res) {
//         console.log(res._worksheets[1]._rows, '////')
//         // use workbook
//     });
// if (fs.existsSync('./download/' + fileName + new Date().getTime())) {}




app.listen(3000, () => {
    console.log('启动成功')
});