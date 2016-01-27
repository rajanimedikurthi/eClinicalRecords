var config=require('./../config/env/developer') ;
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var ObjectId=mongodb.ObjectID;
var mydb;
mongoclient.connect(config.mongodburl, function(err,db){
  if(err){
    console.log("unable to connect to mongodb server . Error ",err);
  }else {
    console.log('connection to mongodb server established ',config.mongodburl);
    mydb=db;
    db.close();
  }});

  var getQueryData=function(userdata){
    var qdata={};

    if(userdata.firstname!="undefined")
     qdata["firstname"]= userdata.firstname;
     if(userdata.lastname!="undefined")
      qdata["lastname"]= userdata.lastname;

      if(userdata.age!="undefined")
       qdata["age"]= userdata.age;
     if(userdata.mobile!="undefined")
      qdata["mobile"]= userdata.mobile;

       if(userdata.address!="undefined")
        qdata["address"]= userdata.address;
        if(userdata.details!="undefined")
         qdata["details"]= userdata.details;


        if(userdata.medicines!="undefined")
         qdata["medicines"]= userdata.medicines;

       return qdata;

};
writeSearchHeader=function(res ,addbackbtn){
  res.write('<div class="header"><span class="fa fa-search"><input type="text" name="searchstr"></span>');
  if(addbackbtn){
      res.write('<button class="fa fa-back" ></button>');
  }
  res.write('<button class="fa fa-plus" id="addrecord">Add Patient </button>');
  res.write('</div> ');
}
  /* Add patient function */
  var  addpatient =function(req,res,userdata){
    console.log("add patient")
    res.write("<p> Fill out patient details </p>")
    res.write('<label for="firstname">First name</label><input type="text" name="firstname"></input>');
    res.write('<label for="lastname">Last name</label><input type="text" name="lastname"></input><br/>');
    res.write('<label for="age">DOB</label><input name="age" type="text" class="datepicker"></input>');
    res.write('<label for="mobile">Mobile</label><input type="text" name="mobile"></input><br/> ');
    res.write('<label for="address">Address</label><textarea rows=5  name="address"></textarea> ');
    res.write('<label for="details">Details</label><textarea rows=5  name="details" ></textarea> <br/>');
    res.write('<label for="medicines">Medicines</label><textarea rows=5  name="medicines" ></textarea> <br/>');
    res.write('<div class="buttonWrapper"><input type="button" value= "Create"> </input></div>');
    res.end();
  }


  /* create  patient function */
  var  createpatient =function(req,res,userdata){
    console.log("create patient ")
    mydb.open(function(err,db){
      if(!err){
        patientsdb =db.collection('patients');
        delete userdata.action;
        patientsdb.insert(getQueryData(userdata), function (ierr1, result) {
          if (!ierr1) {
            console.log('created patient record successfully ', result);
          }
        });
        db.close();
      fetchpatients(req,res);
      }});
    }

    /* Delete patient function */
    var    deletepatient= function(req,res,userdata){
      mydb.open(function(err,db){
        if(!err){
           patientsdb =db.collection('patients');
           patientsdb.remove({_id:ObjectId(userdata.id)},function(ferr, patient) {
             if(ferr){
               res.end("ferr" +ferr)
             }else {
               db.close();
                 fetchpatients(req,res);
             }
           });
        }
      });
}
    /* Update patient function */
    var  updatepatient =function(req,res,userdata){
      mydb.open(function(err,db){
        if(!err){
              patientsdb =db.collection('patients');
                  patientsdb.findAndModify({_id:ObjectId(userdata.id)},[],getQueryData(userdata),function(ferr, patient) {
                    if(ferr){
                      res.end("ferr" +ferr)
                    }else {
                      db.close()
                         fetchpatients(req,res);
                    }
              });
        }
      });
    }

    /* fetch  patient function */
    var fetchpatients =function(req,res,userdata){
      mydb.open(function(err,db){
        if(!err){
          patientsdb =db.collection('patients');
          if(userdata && userdata.edit){
            console.log("Editttttt")
            patientsdb.findOne({_id:ObjectId(userdata.id)},function(ferr, patient) {
                if(ferr){
                  res.end("ferr" +ferr)
                }else {
                  if(patient != null){

                    res.write('<label for="firstname">First name</label><input type="text" name="firstname" value="'+ patient.firstname+'"></input>');
                    res.write('<label for="lastname">Last name</label><input type="text" name="lastname" value="'+ patient.lastname+'"></input><br/>');
                    res.write('<label for="age">DOB</label><input name="age" type="text" class="datepicker" value="'+ patient.age+'" ></input>');
                    res.write('<label for="mobile">Mobile</label><input type="text" name="mobile" value="'+ patient.mobile+'"></input><br/> ');
                    res.write('<label for="address">Address</label><textarea rows=5  name="address" >'+ patient.address+'</textarea> ');
                    res.write('<label for="details">Details</label><textarea rows=5  name="details"  >'+ patient.details+'</textarea> <br/>');
                    res.write('<label for="medicines">Medicines</label><textarea rows=5  name="medicines"  >'+ patient.medicines+'</textarea> <br/>');
                    res.write('<div class="buttonWrapper"> <input type="button" class="simple" value= "Cancel"><input type="button" id="'+  patient._id+'"class="strong" value= "Update"/> </input></div>');
                    res.end()
                }else{
                  res.end("Could not edit details of " + userdata.firstname +" " +userdata.lastname);
                }
                db.close();
               }
              });//end of find one
          }else{
              console.log("Fetching all patitents")
              var bSearch=false;
            var cursor;
            if(userdata.searchstr){
              cursor=patientsdb.find({"firstname": { $regex: "^"+userdata.searchstr+".*" , $options: "i" }}).sort([["_id",-1]]);
              bSearch=true;
            }else{
              cursor= patientsdb.find().sort([["_id",-1]]).limit(10);
            }
                var i=0;
                    cursor.each(function(err1, patient) {
                      if(!err1){
                            if(patient != null){
                            if(i==0){
                                writeSearchHeader(res ,bSearch)

                                res.write("<Table class='patientstable'><thead><tr><th>First Name</th><th>LastName</th><th>Mobile</th><th></th></tr></thead><tbody>");
                            }
                          res.write( "<tr><td> " + patient.firstname+"</td>" );
                          res.write( "<td> " + patient.lastname+"</td>" );
                          res.write( "<td> " + patient.mobile+"</td>" );
                          res.write( "<td> <button class='fa fa-edit' id='"+  patient._id+"'></button><button class='fa fa-trash-o' id='"+  patient._id+"'></button></td>" );
                          res.write("</tr>");
                          i++;
                        }
                        else{
                          db.close();
                          if(i==0){
                              writeSearchHeader(res)
                            res.end("<p class='msg'>No records exist</p>")
                          }else{
                            res.write("</tbody></Table>");
                            res.end()
                          }
                        }
                      }else {
                        res.end("error",err1)
                      }
                    }); //end of cursor each
                  }
          }//end of if err
        }); //end of db open
      };//end of fetch patients
      /*exports function */
      module.exports={
        performactions:function(req,res,queryData){
          var userdata={};
          var action=queryData.action;
          res.writeHead(200,{
            'Content-Type':'text/htnl'
          });
          delete queryData.action;
          switch(action){
            case "fetch":
            fetchpatients(req,res,queryData);
            break;
            case "addpatient":
            addpatient(req,res,queryData);
            break;
            case "create":
            createpatient(req,res,queryData);
            break;
            case "update":
            updatepatient(req,res,queryData);
            break;
            case "delete":
            deletepatient(req,res,queryData);
            break;
          }
        }//end of performactins
      }
