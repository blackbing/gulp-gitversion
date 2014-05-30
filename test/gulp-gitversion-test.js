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

var regs = {
  'js': /\/\/ git version: [0-9a-zA-Z]+/,
  'css': /\/\* git version: [0-9a-zA-Z]+ \*\//,
  'html': /<!-- git version: [0-9a-zA-Z]+ -->/
};

var getExpectStream = function(stream, fakeFile, reg, done){
    stream.on('data', function(file) {
      expect(file.contents.toString()).to.match(reg);
      done();
    });

    stream.write(fakeFile);
    stream.end();
    return stream;
};

describe('Append git version', function(){
  it('append git version in js type', function(done){
    var stream = gitversion({type:'js'});
    var reg = regs.js;

    var fakeFile = getMockFile('js', '//somebody');
    stream = getExpectStream(stream, fakeFile, reg, done)
  });
  it('append git version in css type', function(done){
    var stream = gitversion({type:'css'});
    var reg = regs.css;

    var fakeFile = getMockFile('css', '/* somebody */');
    stream = getExpectStream(stream, fakeFile, reg, done)
  });
  it('append git version in html type', function(done){
    var stream = gitversion({type:'html'});
    var reg = regs.html;

    var fakeFile = getMockFile('html', '<html></html>');
    stream = getExpectStream(stream, fakeFile, reg, done)
  });
  it('append git version by detecting file extension name js', function(done){
    var stream = gitversion();
    var reg = regs.js;
    var fakeFile = getMockFile('js', '//somebody');
    stream = getExpectStream(stream, fakeFile, reg, done)
  });
  it('append git version by detecting file extension name css', function(done){
    var stream = gitversion();
    var reg = regs.css;
    var fakeFile = getMockFile('css', '/* somebody */');
    stream = getExpectStream(stream, fakeFile, reg, done)
  });
  it('append git version by detecting file extension name html', function(done){
    var stream = gitversion();
    var reg = regs.html;
    var fakeFile = getMockFile('html', '<html></html>');
    stream = getExpectStream(stream, fakeFile, reg, done)
  });
});
