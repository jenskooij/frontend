"use strict";
const fs = require('fs');
const CleanCSS = require('clean-css');
const colors = require('colors');

module.exports = {
  run: function (resolve, targetPath, targetSassFile, targetCssFile) {
    "use strict";

    console.log('[cssMinify] Clearing  target ' + targetCssFile);

    let buf = fs.readFileSync(targetPath + '/' + targetSassFile, "utf8", function (err) {
      if (err) {
        throw err;
      }
    });
    console.log('[cssMinify] - Read ' + targetPath + '/' + targetSassFile);
    let options = {};
    let output = new CleanCSS(options).minify(buf);

    fs.writeFile(targetPath + '/' + targetCssFile, output.styles, (err) => {
      resolve('[cssMinify] ' + colors.cyan('done'));
    });
  }
};