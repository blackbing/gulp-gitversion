var streamMap = require('map-stream');
var child_process = require('child_process');
module.exports = function() {
  return streamMap(function(file, cb) {
    child_process.exec('git rev-parse HEAD', function (error ,stdout) {
      var string = [
        '// git version:' + stdout,
        '// create at: ' + new Date()
      ].join('\n');
      file.contents = new Buffer(file.contents.toString() + string);
      cb(null, file);
    }
  });
};
