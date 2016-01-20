var patients=(function(){


  var dataaction;
  var makepatientrequest=function(dataaction,postdata){
    data={"action":dataaction,"userdata":postdata}
    $.ajax({
       url:"/performaction",
       method:"POST",
       data:data
    }).success(function(msg){
        $("#patientDetails").html(msg);
    }).error(function(){
      alert("Error");
    });
}
  return {
    addpatient:function(){
      dataaction="addpatient";
        makepatientrequest("addpatient");
    },
    create:function(){
      console.log("create");
      dataaction="create";
    var inputs=  $("#patientDetails input[type=text]");
    var textareas=$("#patientDetails textarea");
    var user={};
    inputs.each(function(){
      user[this.name]=$(this).val();
    });
    textareas.each(function(){
      user[this.name]=$(this).val();
    });
        makepatientrequest("create",user);
    },
    delete:function(){
      dataaction="delete";
        makepatientrequest("delete");
    },
    fetch:function(){
    dataaction="fetch";
    makepatientrequest("fetch");
    },
    update:function(){
      dataaction="update";
        makepatientrequest("update");
    }
  }

})();
$(document).on('click', '#addrecord', function(){
 patients.addpatient();
});
$(document).on('click', 'input[type="button"]', function(){
 patients.create();
});

    $("body").on("click", ".datepicker", function(){
            $(this).datepicker({
      changeMonth: true,
      changeYear: true
    });
            $(this).datepicker("show");
    });
