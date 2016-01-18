$( document ).ready(function() {
  var viewportWidth = $(window).width();
  var viewportHeight = $(window).height();
  var top=$(".leftPanel").css("top")
  $(".leftPanel").height(viewportHeight-(top+1));
    $(".mainPanel").height(viewportHeight-(top+1));
        $(".mainPanel").width(viewportWidth-150);
    /* Adding event to "My patients"  */
    $(".leftPanel .patients").on("click" , function(){
      loadfile( "patients.js", function() {
        $("#mainContent").html("<div class='header'><span class='fa fa-search'><input type='text' name='searchstr'></span></input><button class=\"fa fa-plus\" id=\"addrecord\">Add Patient </button></div><div id='patientDetails'></div>");
       patients.fetch();
     });
});
    $(".leftPanel .appointments").on("click" , function(){
             appointments.show();
      });

 });
 function loadfile(src, callback) {
   var scriptag = document.createElement('script');
   document.getElementsByTagName('head')[0].appendChild(scriptag);
   if(scriptag.onreadystatechange){
     scriptag.onreadystatechange = function() {
          if (scriptag.readyState == 4 || scriptag.readyState == "complete") {
              if (typeof callback == "function") callback();
              callback = null; // Wipe callback, to prevent multiple calls.
          }
      }
   } else{
     scriptag.onload = function() {
         //callback if existent.
         if (typeof callback == "function") callback();
         callback = null;
     }
   }
    scriptag.src = src;
}
