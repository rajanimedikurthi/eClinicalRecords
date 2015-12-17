process.env.NODE_ENV=  process.env.NODE_ENV || 'development';
var http=require('http'),fs=require("./my_modules/fileserver") , url = require('url') ,qs=require("querystring");;
var mongoose=require("./config/mongoose");
var db=mongoose();
http.createServer(function(req,res){
        var queryObject;
  if(req.method=="POST"){
     var queryData = "";
    req.on('data', function(data) {
            queryData += data;
        });

        req.on('end', function() {
          queryObject = qs.parse(queryData);
          buildResponse(req,res,queryObject);
        });
  }else{
       queryObject = url.parse(req.url,true).query;
      buildResponse(req,res,queryObject);
  }


 /*  res.writeHead(200,{
    'Content-Type':'text/plain'
  });
  res.end("Hello World");*/

}).listen(8181);
function buildResponse(req,res,queryObject){
  if(req.url=="/"){
    fs("/welcome.html",req,res);
    //debugger;
}else if(req.url=="/performaction"){


 res.writeHead(200,{
   'Content-Type':'text/plain'
 });

   if(queryObject["action"]=="fetch"){
          res.write("Fetch");
   }else if(queryObject["action"]=="create"){
    res.write("create");
   }else if(queryObject["action"]=="update"){
res.write("update");
   }else if(queryObject["action"]=="delete"){
res.write("delete");
   }
     res.end();
         //debugger;
console.log(queryObject);
}else{
    fs(req.url,req,res);
 }
}
console.log("Server running @http://localhost:8181/");
