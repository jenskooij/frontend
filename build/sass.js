"use strict";
const sass = require('node-sass');
const colors = require('colors');
const fs = require('fs');

module.exports = {
  run: function (resolve, sassPath, targetPath, targetSassFile, resetCss) {
    "use strict";

    console.log("[sass] start");

    sass.render({
      file: sassPath + "/site.scss",
    }, function (err, result) {
      if (err) {
        console.log(colors.red("[sass] " + err));
      } else {
        if (resetCss === true) {
          console.log('[sass] Adding css reset');
          let buf = fs.readFileSync('node_modules/reset-css/reset.css', "utf8", function (err) {
            if (err) {
              throw err;
            }
          });
          fs.writeFile(targetPath + '/' + targetSassFile, '/* Compiled SASS */\n' + buf + ";\n" + result.css, (err) => {
            if (err) {
              throw err;
            }
            resolve('[sass] ' + colors.cyan('done'));
          });
        } else {
          fs.writeFile(targetPath + '/' + targetSassFile, '/* Compiled SASS */\n' + result.css, (err) => {
            if (err) {
              throw err;
            }
            resolve('[sass] ' + colors.cyan('done'));
          });
        }
      }
    });

  }
};