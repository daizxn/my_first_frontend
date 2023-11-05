const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const mime = require('mime-types');
const staticHandler=require('./lib/staticHandler.js');
const listHandler = require('./lib/listHandler.js');
const uploadHandler = require('./lib/uploadHandler.js');

// 端口号
const port = 3000;
const server = http.createServer((req, res) => {
    let pathUrl = req.url;

    console.log(`请求: [${req.method}]${pathUrl}`);

    // 默认路径
    if (!pathUrl || pathUrl === '/') pathUrl = 'index.html';

    // TODO: 文件上传处理 /pic/upload
    if(pathUrl.endsWith('upload')){
        return uploadHandler(req,res);
    }
    // TODO: 数据查询接口 /pic/list
    if(pathUrl.endsWith('/pic/list')){
        return listHandler(req,res);
    }
    // TODO: 处理静态文件
    return staticHandler(pathUrl,res);
});

server.timeout = 3000; // 超时时间3s(便于项目调试，实际项目中无需指定)
server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});