var streamMap = require('map-stream');
var child_process = require('child_process');
var path = require('path');


var trim=function(s){return s.replace(/^\s+|\s+$/g, '');};
module.exports = function(opts) {

  var d = new Date();
  var WrapTypes = {
    'js': function(v){
      return ";\n// git version: " + v + "\n// created at: " + d;
    },
    'css': function(v){
      return "/* git version: " + v + " */\n/* created at: " + d + "*/";
    },
    'html': function(v){
      return "<!-- git version: " + v + " -->" + "\n<!-- created at: " + d + " -->";
    }
  };


  return streamMap(function(file, cb) {
    if(!opts){
      var extname = path.extname(file.path);
      extname = extname.substr(1);
      opts = {}
      opts.type = extname;
    }
    wrapType = WrapTypes[opts.type];
    if(!wrapType){
      console.error();
      errMsg = '[gulp-gitversion] Not support this type: ['+ opts.type +']!';
      errMsg += '\nPlease contact blackbing@gmail.com if you have any suggestion';
      throw new Error(errMsg);
    }
    child_process.exec('git rev-parse HEAD', function (error ,stdout) {
      var v = trim(stdout);
      var string = wrapType(v);
      file.contents = new Buffer(file.contents.toString() + string);
      cb(null, file);
    });
  });
};

