const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    let path='./views/';
    switch (req.url){
        case'/':
        path+='index.html';
        break;
        case'/about':
        path+='about.html';
        break;
        default:
        path+='404.html';
        break;
    }
    res.setHeader('content-Type','text/html');
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    })
});
 server.listen(3000,'localhost',()=>{
    console.log("listening");
 });