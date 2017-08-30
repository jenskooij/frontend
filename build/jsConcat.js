"use strict";

const sync = require('./syncloop');
const fs = require('fs');
const jshint = require('jshint');
const colors = require('colors');

module.exports = {
  run: function (resolve, jsPath, targetPath, targetJsFile) {
    console.log('[jsConcat] start');

    fs.writeFile(targetPath + '/' + targetJsFile, '/* Compiled JS */\n', (err) => {
      if (err) {
        throw err;
      }
      let files = fs.readdirSync(jsPath);
      module.exports.concatDir(files, jsPath, targetPath, targetJsFile, resolve)

    });

  },

  concatDir: function (files, jsPath, targetPath, targetJsFile, resolve) {

    sync.syncLoop(files.length, function (loop) {
      let i = loop.iteration();
      let filename = jsPath + '/' + files[i];
      let j;

      if (fs.lstatSync(filename).isDirectory()) {
        let subFiles = fs.readdirSync(filename);
        module.exports.concatDir(subFiles, filename, targetPath, targetJsFile, resolve);
        loop.next();
      } else {
        let buf = fs.readFileSync(jsPath + '/' + files[i], "utf8", function (err) {
          if (err) {
            throw err;
          }
        });
        console.log('[jsConcat] - Read ' + filename);
        console.log('[jsConcat] - jsLint ' + filename);

        // only jshint files that arent already minified
        if (filename.indexOf('.min.js') === -1) {
          var result = jshint.JSHINT(buf);

          if (jshint.JSHINT.length !== 0) {
            for (j = 0; j < jshint.JSHINT.errors.length; j += 1) {
              var errorObj = jshint.JSHINT.errors[j];
              console.error(colors.red('[jsConcat] Error occured in ' + filename + ":" + errorObj.line + ":" + errorObj.character));

              console.error(colors.red('[jsConcat] ' + errorObj.raw));
            }
          }
        } else {
          console.log('[jsConcat] Not jsHinting file ' + filename);
        }


        fs.appendFile(targetPath + '/' + targetJsFile, buf + ';\n', function (err) {
          if (err) {
            throw err;
          }
          loop.next();
        });

        loop.next();
      }
    }, function () {
      resolve('[jsConcat] done');
    });
  }
};