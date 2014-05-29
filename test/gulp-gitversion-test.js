var gitversion = require('../'),
     expect = require('chai').expect,
     File = require('gulp-util').File
     Stream = require('readable-stream');
// Helper
function getStreamFromBuffer(string) {
  var stream = new Stream.Readable();
  stream._read = function() {
    stream.push(new Buffer(string));
    stream._read = stream.push.bind(stream, null);
  };
  return stream;
}

function getMockFile(extName, body){
  var fakeFile = new File({
    cwd: __dirname,
    base: __dirname + 'test',
    path: __dirname + 'test/file.'+ extName,
    contents:  getStreamFromBuffer(new Buffer(body))
  });
  return fakeFile;
}

describe('Append git version', function(){
  it('append git version in js type', function(done){
    var stream = gitversion({type:'js'});
    var reg = /\/\/ git version: [0-9a-zA-Z]+/;

    var fakeFile = getMockFile('js', '//somebody');
    stream.on('data', function(file) {
      expect(file.contents.toString()).to.match(reg);
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });
  it('append git version in css type', function(done){
    var stream = gitversion({type:'css'});
    var reg = /\/\* git version: [0-9a-zA-Z]+ \*\//;

    var fakeFile = getMockFile('css', '/* somebody */');
    stream.on('data', function(file) {
      expect(file.contents.toString()).to.match(reg);
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });
  it('append git version in html type', function(done){
    var stream = gitversion({type:'html'});
    var reg = /<!-- git version: [0-9a-zA-Z]+ -->/;

    var fakeFile = getMockFile('html', '<html></html>');
    stream.on('data', function(file) {
      expect(file.contents.toString()).to.match(reg);
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });
});
