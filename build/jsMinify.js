"use strict";

const fs = require('fs');
const UglifyJS = require("uglify-js");
const colors = require('colors');

module.exports = {
  run: function (resolve, targetPath, targetJsFile, targetJsMinFile) {
    console.log('[jsMin] start');

    let targetReadFile = targetPath + '/' + targetJsFile;
    let targetWriteFile = targetPath + '/' + targetJsMinFile;
    console.log('[jsMin] target read file: ' + targetReadFile);
    console.log('[jsMin] target write file: ' + targetWriteFile);

    fs.readFile(targetReadFile, (err, data) => {
      if (err) throw err;
      let stringData = data.toString();
      let result = UglifyJS.minify(stringData);
      fs.writeFile(targetWriteFile, result.code, (err) => {
        if (err) {
          throw err;
        }
        resolve('[jsMin] ' + colors.cyan('done'));
      });
    });
  }
};