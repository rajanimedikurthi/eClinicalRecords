var mongoose=require('mongoose')
schema=mongoose.Schema;
var patientSchema= new Schema({
    firstName: String,
    lastName:String,
    email:String
});
mongoose.model('Patient',patientSchema);
