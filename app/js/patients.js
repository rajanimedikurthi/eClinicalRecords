var patients=(function(){
  var makepatientrequest=function(data){
    $.ajax({
      url:"/performaction",
      method:"POST",
      data:data
    }).success(function(msg){

      $("#patientDetails").html(msg);

    }).error(function(){
      alert("Error");
    });
  };
  var getPatientDetails=function(data){
    data=data?data:{};
    var inputs=  $("#patientDetails input[type=text]");
    var textareas=$("#patientDetails textarea");
    var user={};
    inputs.each(function(){
      data[this.name]=$(this).val();
    });
    textareas.each(function(){
      data[this.name]=$(this).val();
    });
    return data;
  }
  return {
    addpatient:function(data){
      data=data||{};
      data.action="addpatient";
      makepatientrequest(data);
    },
    create:function(data){
        data=data||{};
      data.action="create";
      makepatientrequest(getPatientDetails(data));
    },
    delete:function(data){
        data=data||{};
      data.action="delete";
      makepatientrequest(data);
    },
    fetch:function(data){
        data=data||{};
      data.action="fetch";
      makepatientrequest(data);
    },
    update:function(id){
      var data= {};
      data.action="update";
      data.id=id;
      makepatientrequest(getPatientDetails(data));
    }

  }

})();

$(document).on('click', '#addrecord', function(){
  patients.addpatient();
});
$(document).on('click', 'input[value="Create"]', function(){
  patients.create();
});
$(document).on('click', '.fa-search', function(event){
  var target =event.target;
  if(target==this){ //becasue of search icon psuedo class
        patients.fetch({searchstr:$("input[name='searchstr']").val().trim()});
  }

});
$(document).on('click', '.fa-back', function(event){
        patients.fetch();
});
$(document).on('click', 'input[value="Update"]', function(){
  patients.update($(this).attr("id"));
});
$(document).on( "click", '.patientstable  .fa-edit', function(){
  var data={"edit":true ,"id":$(this).attr("id")};
  patients.fetch(data);
});
$(document).delegate( '.patientstable  .fa-trash-o','click', function(){
  var data={"id":$(this).attr("id")};
  patients.delete(data);
});
$("body").on("click", ".datepicker", function(){
  $(this).datepicker({
    changeMonth: true,
    changeYear: true
  });
  $(this).datepicker("show");
});
