const Vue = require('vue')
const server = require('express')()
const createApp = require('./app')
// var http = require('http');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.html', 'utf-8')
})

server.get('*', (req, res) => {
    const context = {
        url: req.url
    }
    const app = createApp(context)

    renderer.renderToString(app, (err, html) => {
        console.log(html)
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})

server.listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');