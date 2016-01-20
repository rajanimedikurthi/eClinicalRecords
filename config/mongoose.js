var config=require('./env/developer') ;

var mongoclient=require('mongodb').MongoClient;
var mongodb;
    var patientsdb;
mongoclient.connect(config.mongodburl, function(err,db){
  if(err){
    console.log("unable to connect to mongodb server . Error ",err);
return null;
  }else {
     console.log('connection to mongodb server established ',config.mongodburl);
     mongodb=db;
    patientsdb =mongodb.collection('patients');
   }});

module.exports={

               createpatient:function(user){
                 patientsdb.insert(user, function (err, result) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('created patient record successfully ', result);
                    }
                });
              },
               deletepatient:function(){

               },
               updatepatient:function(){

               },
               fetchpatients:function(){

               }
           }




/*var mongoose=require('mongoose');
module.exports=function(){
  var db=mongoose.connect(config.db);
  return db;
}*/
