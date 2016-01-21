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
  addpatient:function(req,res,userdata){
    res.write("<p> Fill out patient details </p>")
    res.write('<label for="firstname">First name</label><input type="text" name="firstname"></input>');
    res.write('<label for="lastname">Last name</label><input type="text" name="lastname"></input><br/>');
    res.write('<label for="age">DOB</label><input name="age" type="text" class="datepicker"></input>');
    res.write('<label for="mobile">Mobile</label><input type="text" name="mobile"></input><br/> ');
    res.write('<label for="address">Address</label><textarea rows=5  name="address"></textarea> ');
    res.write('<label for="details">Details</label><textarea rows=5  name="details" ></textarea> <br/>');
    res.write('<label for="medicines">Medicines</label><textarea rows=5  name="medicines" ></textarea> <br/>');
    res.write('<div class="buttonWrapper"><input type="button" value= "Create"> </input></div>');
  },
  createpatient:function(req,res,userdata){
    mydb.open(function(err,db){
       if(!err){
         patientsdb =db.collection('patients');
         patientsdb.insert(userdata, function (err, result) {
           if (!err) {
               console.log('created patient record successfully ', result);
           }
         });
         db.close();
         res.write("Created successfully");
       }});
    },
    deletepatient:function(req,res,userdata){

    },
    updatepatient:function(req,res,userdata){

    },
    fetchpatients:function(req,res,userdata){
      mydb.open(function(err,db){
         if(!err){
           patientsdb =db.collection('patients');
          var cursor= patientsdb.find().limit(10);
          res.write("<Table>");
          cursor.each(function(err,doc){
            if(!err){
               res.write("<td>"+ +"</td>");
            }

          });
          res.write("</Table>");
           db.close();
         }});
      }
  }
