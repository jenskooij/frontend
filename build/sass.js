"use strict";
const sass = require('node-sass');
const colors = require('colors');
const fs = require('fs');

module.exports = {
  run: function (resolve, sassPath, targetPath, targetSassFile) {
    "use strict";

    console.log("[sass] start");

    sass.render({
      file: sassPath + "/site.scss",
    }, function (err, result) {
      if (err) {
        console.log(colors.red("[sass] " + err));
      } else {
        fs.writeFile(targetPath + '/' + targetSassFile, '/* Compiled SASS */\n' + result.css, (err) => {
          if (err) {
            throw err;
          }
          resolve('[sass] ' + colors.cyan('done'));
        });
      }
    });


  }
};