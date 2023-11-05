const express=require('express');
const fs=require('fs');
const path=require('path');
const formidable=require('formidable');

const app=new express();

app.use(express.static('web'));

app.post('/pic/upload',(req,res)=>{
    const form = formidable({
        multiples: true,
        keepExtensions: true,
        uploadDir: path.join(__dirname,'web/data/pic'),
        filenname:(name,ext)=>{
            return `${name}-${Data.now()}${ext}`
        }
    });
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.json({success:false});
            return;
        }
        console.log('upload',fields,files);
        res.json({success:true});
    });
});

app.get('/pic/list',(req,res)=>{
    const filePath=path.join(__dirname,'web/data/data.json');
    fs.readFile(filePath,(err,content)=>{
        if(err){
            res.json({success:false});
            return;
        }
        res.json({success:true,data:JSON.parse(content)});
    });
});

app.listen(80 ,()=>{
    console.log('server listening on port:80');
});