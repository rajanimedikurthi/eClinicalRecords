process.env.NODE_ENV=  process.env.NODE_ENV || 'development';
var http=require('http'),fs=require("./my_modules/fileserver"),
  url = require('url') ,qs=require("querystring");;
  var sjs=require("./my_modules/servercode");
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
             sjs.actions.fetch(req,res);
     }else if(queryObject["action"]=="addpatient"){
       sjs.actions.addpatient(req,res);
     }else if(queryObject["action"]=="create"){
       sjs.actions.create(req,res);
     }else if(queryObject["action"]=="update"){
       sjs.actions.update(req,res);
     }else if(queryObject["action"]=="delete"){
       sjs.actions.delete(req,res);
     }
     res.end();
           //debugger;
           console.log(queryObject);
  }else{
      fs(req.url,req,res);
   }
}
console.log("Server running @http://localhost:8181/");
