
let Koa = require('koa');
let xlsx = require('node-xlsx');
let fs = require('fs');
let http = require('http');
let querystring = require('querystring');
let koaBody = require('koa-body')
let cors = require('koa-cors');
let send = require('koa-send');
let Router = require('koa-router');

let app = new Koa();

let router = new Router();

app.use(cors());
app.use(koaBody());

let flag = false;
let excelData = [
    ['部门', '姓名', '学号', '电话', '流程进度', '状态', '消息推送']
];

router.post('/requestDownload', async (ctx, next) => {
    flag = false;
    console.log(ctx.request.path);
    getList(ctx.request.body)
    ctx.body = '1';

})

router.get('/download', async (ctx, next) => {
    console.log('download')
    let fileName = './test.xlsx'
    ctx.attachment(fileName);
    excelData = [
        ['部门', '姓名', '学号', '电话', '流程进度', '状态', '消息推送']
    ];
    await send(ctx, fileName);
})

let options = {
    hostname: 'bmtest.redrock.team',
    path: '/469bba0a564235dfceede42db14f17b0/getuserlist',
    port: 8080,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Length': Buffer.byteLength(postData),
        'authorization': ''
    }
};
let postData;

let getList = (data) => {
    console.log('getlist')
    let resData = '';
    let dd = {
        'oname': data.oname,
        'dname': data.dname,
        'info': data.info,
        'result': data.result,
        'size': 5000,
        'currindex': 1
    }
    let obj = {
        'oname': dd.oname,
        'size': 5000,
        'currindex': 1
    };
    if (dd.dname !== dd.oname) {
        obj.dname = dd.dname
    }
    if (dd.info.length > 0) {
        obj.info = dd.info;
    }
    if (dd.result.length > 0) {
        obj.result = dd.result;
    }

    postData = querystring.stringify(obj);
    options.headers.authorization = encodeURI(data.authorization.toString()).split('%')[0];
    let req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            resData += chunk;
        });
        res.on('end', () => {
            let dd = dealData(resData);
            //console.log(dealData(resData));
            for (var i = 0; i < dd.length; i++) {
                let arr = [];
                arr[0] = dd[i].dname;
                arr[1] = dd[i].stuname;
                arr[2] = dd[i].stuid;
                arr[3] = dd[i].phonenum;
                arr[4] = dd[i].info;
                arr[5] = dd[i].result;
                arr[6] = dd[i].status;
                excelData.push(arr);
            }
            var buffer = xlsx.build([{
                name: "mySheetName",
                data: excelData
            }]);

            fs.writeFile('./test.xlsx', buffer, (err) => {
                flag = true;
                console.log(flag);
            });
            console.log('No more data in response.')
        })
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
    return '123';
}


let dealData = (data) => {

    let dataArr = [];
    if (typeof(data) === 'string') {
        //console.log(data);
        dataArr = data.split('[')[1].split(']')[0].split('{').slice(1);
        console.log(dataArr.length);

        for (let i = 0, length1 = dataArr.length; i < length1; i++) {
            let l = dataArr[i].length;
            if (i === dataArr.length - 1) {
                dataArr[i] = JSON.parse('{' + dataArr[i]);
                dataArr[i].index = i + 1;
            } else {
                dataArr[i] = JSON.parse('{' + dataArr[i].slice(0, l - 1));
                dataArr[i].index = i + 1;
            }
        }
    }
    //console.log(dataArr)
    return dataArr;
}


app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(4001, () => {
    console.log(4001);
});