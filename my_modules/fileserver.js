var __dirPath="D:/PegaWork/LPProjects/eClinicalRecords/app/";
module.exports = function(url, req, res, callback) {
   var file;
    var fs = require('fs')
        , ext = require('path').extname(url).substring(1)
        , fileExtensions = {
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
                file=file+url;
                break;
            case "woff2":
            case "woff":
            case "ttf":
            case "svg":
                file=file+url;
                break;
            default:
              file=file+ext;
              file=file+url;
        }


    }

    console.log('file ****   '+req.url.substring(1));

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
            console.log("'My Log-1 :" + file,'file not exists')
          }
      })
}
