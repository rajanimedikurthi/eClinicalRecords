var __dirPath="E:/PegaWork/LPProjects/eClinicalRecords/app/";
module.exports = function(urllink, req, res, callback) {
   var file;
    var fs = require('fs'),path=require('path'),url=require("url");
    var fileExtensions = {
          'html':'text/html',
          'css':'text/css',
          'js':'text/javascript',
           'ico':"image/x-icon",
          'json':'application/json',
          'png':'image/png',
          'jpg':'image/jpg',
          'wav':'audio/wav',
          "woff":"application/x-font-woff",
          "ttf":"application/font-sfnt"
      };
      var parsedurl=path.parse(urllink);
        var  ext = parsedurl.ext.substring(1);var filename=parsedurl.base;
        if (ext.indexOf("?") > -1) {
          ext = ext.substring(0, ext.indexOf("?"));
          filename=filename.substring(0, ext.indexOf("?"));
        }
        //console.log(parsedurl);

    if(ext)
    {
        file=__dirPath;
        console.log("ext"+ ext);
        switch(ext){
            case"png":
            case "jpg":
            case "wav":
            case "ico":
                file=file+"icons";
                file=file+urllink;
                break;
            case "woff2":
            case "woff":
            case "ttf":
            case "svg":
                file=file+urllink;
                break;

            default:
              file=file+ ext+parsedurl.dir;
              if(parsedurl.dir=="/")
                file=file+ parsedurl.name+"."+ext;
              else
                file=file+"/"+ parsedurl.name+"."+ext;
        }


    }

    console.log('My Log file ****   '+file);

  options={};
    //fs.existsSync(file);
      fs.exists(file, function(exists) {
          if(exists) {

              if(fileExtensions[ext]){

                fs.readFile(file, options , function(err,data){
                  if(data){
                     options["Content-Type"] =fileExtensions[ext]?fileExtensions[ext]:"text/html";
                      res.writeHead(200, options);
                    res.write(data)

                  }else{
                      res.writeHead(404);
                  }
                    res.end()
                });
              }
          } else {
            console.log("'My Log :" + file,'file not exists')
          }
      })
}
