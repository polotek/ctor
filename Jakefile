var browserify = require('browserify');
var uglifyjs = require('uglify-js');
var fs = require('fs');
desc('Builds Ctor for the browser');
task('build', function () {
  jake.Task['ascii'].invoke();
  console.log('Building ctor.js');
  // First we generate an unminified, browser version of ctor
  browserify('./index.js').bundle({standalone: 'ctor'}, function (err, src) {
    if (err) {
      console.log(err);
      return;
    }
    // Stupid umd bug makes everything lowercase, so force fix it
    src = src.replace(/\.ctor/g, ".Ctor");
    // If there were no errors write to the file and then...
    fs.writeFile('browser/ctor.js', src, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Minifying ctor.js');
      // ...if there were no errors, minify and write ctor.min.js
      var minifiedCode = uglifyjs.minify('browser/ctor.js').code;
      fs.writeFile('browser/ctor.min.js', minifiedCode, function(err) {
          err ? console.log(err) : console.log('Build complete');
      });
    });
  });
});

desc('Kick out the ascii');
task('ascii', function() {
  var ascii = ''+
' ______   ______  ______   ______ \ \n'+
'/\\  ___\\ /\\__  _\\/\\  __ \\ /\\  == \\ \ \n'+
'\\ \\ \\____\\/_/\\ \\/\\ \\ \\/\\ \\\\ \\  __< \ \n'+
' \\ \\_____\\  \\ \\_\\ \\ \\_____\\\\ \\_\\ \\_\\ \ \n'+
'  \\/_____/   \\/_/  \\/_____/ \\/_/ /_/ \ \n'
  console.log(ascii);
});
