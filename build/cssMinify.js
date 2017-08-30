"use strict";
let fs = require('fs');
let CleanCSS = require('clean-css');

module.exports = {
  run: function (resolve, targetPath, targetSassFile, targetCssFile) {
    "use strict";

    console.log('[CSS Minify] Clearing  target ' + targetCssFile);

    let buf = fs.readFileSync(targetPath + '/' + targetSassFile, "utf8", function (err) {
      if (err) {
        throw err;
      }
    });
    console.log('[CSS Minify] - Read ' + targetPath + '/' + targetSassFile);
    let options = {};
    let output = new CleanCSS(options).minify(buf);

    fs.writeFile(targetPath + '/' + targetCssFile, output.styles, (err) => {
      resolve('[CSS Minify] done\n');
    });
  }
};