"use strict";
const sync = require('./syncloop');
const fs = require('fs');
const sass = require('node-sass');

module.exports = {
  run: function (resolve, sassPath, targetPath, targetSassFile) {
    "use strict";

    console.log('[SASS] Clearing  target ' + targetSassFile);
    fs.writeFile(targetPath + '/' + targetSassFile, '/* Compiled Sass */\n', (err) => {
      if (err) {
        throw err;
      }
      let files = fs.readdirSync(sassPath);

      let resetLine = '@import \'node_modules/reset-css/_reset\';';
      sass.render({data: resetLine}, function (err, res) {
        fs.appendFile(targetPath + '/' + targetSassFile, res.css, function (err) {
          if (err) {
            throw err;
          }
          console.log('[SASS] - Added CSS reset');
          module.exports.handleOthers(files, resolve, sassPath, targetPath, targetSassFile);
        });
      });

    });
  },
  handleOthers: function (files, resolve, sassPath, targetPath, targetSassFile) {
    sync.syncLoop(files.length, function (loop) {
      let i = loop.iteration();
      console.log('[SASS] Handling ' + files[i]);

      let filename = sassPath + '/' + files[i];

      if (fs.lstatSync(filename).isDirectory()) {
        let subfiles = fs.readdirSync(filename);
        module.exports.handleOthers(subfiles, resolve, filename, targetPath, targetSassFile);
        loop.next();
      } else {
        let buf = fs.readFileSync(sassPath + '/' + files[i], "utf8", function (err) {
          if (err) {
            throw err;
          }
        });
        console.log('[SASS] - Read ' + filename);

        sass.render({
          data: buf,
          includePaths: [ 'scss/**' ]
        }, function (err, res) {
          if (err) {
            console.log('Error in file ' + sassPath + '/' + files[i]);
            throw err;
          }
          console.log('[SASS] - Compiled ' + files[i]);
          fs.appendFile(targetPath + '/' + targetSassFile, res.css, function (err) {
            if (err) {
              throw err;
            }
            loop.next();
          });

        });
      }

    }, function () {
      resolve('[SASS] done');
    });
  },
  handleDir (files, resolve, sassPath, targetPath, targetSassFile) {

  }
};