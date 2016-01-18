  module.exports= {
    addpatient:function(req,res){
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
    create:function(req,res){
        res.write("in create callback");
    },
    update:function(req,res){
        res.write("in update callback");
    },
    fetch:function(req,res){
        res.write("<table></table>");
        res.write("</div>");
    },
    delete:function(req,res){
        res.write("in delete callback");
    }

}
