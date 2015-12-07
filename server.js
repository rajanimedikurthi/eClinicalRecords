process.env.NODE_ENV=  process.env.NODE_ENV || 'development';
var http=require('http'),fs=require("./my_modules/fileserver");
var mongoose=require("./config/mongoose");
var db=mongoose();
http.createServer(function(req,res){
 if(req.url=="/"){
   fs("/welcome.html",req,res);
   //debugger;
console.log(req);
}else{
   fs(req.url,req,res);
}
 /*  res.writeHead(200,{
    'Content-Type':'text/plain'
  });
  res.end("Hello World");*/

}).listen(8181);
console.log("Server running @http://localhost:8181/");
