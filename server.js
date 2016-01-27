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
      queryObject = qs.parse(queryData);
      buildResponse(req,res,queryObject);
    });
  }else{
    queryObject = url.parse(req.url,true).query;
    buildResponse(req,res,queryObject);
  }

}).listen(8181);

/***** function to build response ***/
function buildResponse(req,res,queryObject){
  if(req.url=="/"){
    fs("/welcome.html",req,res);
    //debugger;
  }else if(req.url=="/performaction"){
    sjs.actions.performactions(req,res,queryObject);
  }else{
    fs(req.url,req,res);
  }
}

console.log("Server running @http://localhost:8181/");
