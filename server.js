process.env.NODE_ENV=  process.env.NODE_ENV || 'development';
var http=require('http'),fs=require("./my_modules/fileserver"),
  url = require('url') ,qs=require("querystring");;
  var sjs=require("./my_modules/servercode");
var eventemitter= require("events").EventEmitter;
http.createServer(function(req,res){
    var queryObject;
    if(req.method=="POST"){
        var queryData = "";
        req.on('data', function(data) {
            queryData += data;
        });
        req.on('end', function() {
          //console.log("querydata"+ JSON.parse(queryData));
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
   var userdata={};

   for (var prop in queryObject) {
       // skip loop if the property is from prototype
       if(!(prop=="action"))
       userdata[prop]=queryObject[prop]
   }

   console.log("after parsing"+ userdata);
     if(queryObject["action"]=="fetch"){
             sjs.actions.fetchpatients(req,res,userdata);
     }else if(queryObject["action"]=="addpatient"){
       sjs.actions.addpatient(req,res,userdata);
     }else if(queryObject["action"]=="create"){
       sjs.actions.createpatient(req,res,userdata);
     }else if(queryObject["action"]=="update"){
       sjs.actions.updatepatient(req,res,userdata);
     }else if(queryObject["action"]=="delete"){
       sjs.actions.deletepatient(req,res,userdata);
     }

           //debugger;
           console.log(queryObject);
  }else{
      fs(req.url,req,res);
   }
}
var  ee=new eventemitter();
ee.on("reqdone" ,function requestDone(req, res){
     res.end();
});

console.log("Server running @http://localhost:8181/");
