var config=require('./env/developer') ;
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var mydb;
var mongoserver=mongodb.Server;
mongoclient.connect(config.mongodburl, function(err,db){
  if(err){
    console.log("unable to connect to mongodb server . Error ",err);
  }else {
    console.log('connection to mongodb server established ',config.mongodburl);
    mydb=db;
    db.close();
}});
module.exports={
  createpatient:function(user){
    mydb.open(function(err,db){
       if(!err){
         patientsdb =db.collection('patients');
         patientsdb.insert(user, function (err, result) {
           if (!err) {
               console.log('created patient record successfully ', result);
           }
         });
         db.close();
       }});
    },
    deletepatient:function(){

    },
    updatepatient:function(){

    },
    fetchpatients:function(){
      var result=null;
      mongoclient.connect(config.mongodburl, function(err,db){
        if(err){
          console.log("unable to connect to mongodb server . Error ",err);
        }else {
          console.log('connection to mongodb server established ',config.mongodburl);
          patientsdb =db.collection('patients');
          result=  patientsdb.find().limit(10) ;
          db.close();
          return result;
        }});
      }
    }




    /*var mongoose=require('mongoose');
    module.exports=function(){
    var db=mongoose.connect(config.db);
    return db;
  }*/
