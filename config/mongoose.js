var config=require('./env/developer'),mongoose=require('mongoose');
module.exports=function(){
  var db=mongoose.connect(config.db);
  return db;
}
