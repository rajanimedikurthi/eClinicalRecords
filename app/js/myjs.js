$( document ).ready(function() {
    /* Adding event to "add record" btn */
    $(".fa").on("click" , function(){
      var dataaction
      switch($(this).attr("id")){
        case "addrecord":
          dataaction="create";
          break;
        case "deleterecord":
         dataaction="delete";
         break;
         case "fetchrecord":
           dataaction="fetch";
           break;
         case "updaterecord":
          dataaction="update";
          break;
      }
     $.ajax({
        url:"/performaction",
        method:"POST",
        data:{"action":dataaction}
     }).success(function(msg){

       $("#content").html(msg);
     }).error(function(){
       alert("Error");
     });
    });
 });
