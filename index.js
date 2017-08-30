"use strict";
/*
	Includes
*/
const sass = require('./build/sass');
const cssMinify = require('./build/cssMinify');
const jsConcat = require('./build/jsConcat');
const jsMinify = require('./build/jsMinify');

module.exports = {
  sassPath: 'scss',
  jsPath: 'js',
  targetJsPath: 'target',
  targetCssPath: 'target',
  targetSassFile: 'site.css',
  targetCssFile: 'site.min.css',
  targetJsFile: 'site.js',
  targetJsMinFile: 'site.min.js',
  resetCss:true,
  run: function () {
    /*
	Configuration
 */
      "use strict";
      // Sass
      let sassCompileComplete = new Promise((resolve, reject) => {
        sass.run(resolve, module.exports.sassPath, module.exports.targetCssPath, module.exports.targetSassFile, module.exports.resetCss);
      });

      sassCompileComplete.then((successMessage) => {
        console.log(successMessage);

        // Minify
        let cssMinifyComplete = new Promise((resolve, reject) => {
          cssMinify.run(resolve, module.exports.targetCssPath, module.exports.targetSassFile, module.exports.targetCssFile);
        });

        cssMinifyComplete.then((successMessage) => {
          console.log(successMessage);
        });
      });

      // Js
      let jsConcatComplete = new Promise((resolve, reject) => {
        jsConcat.run(resolve, module.exports.jsPath, module.exports.targetJsPath, module.exports.targetJsFile);
      });

      jsConcatComplete.then((successMessage) => {
        console.log(successMessage);
        let jsMinifyComplete = new Promise((resolve, reject) => {
          jsMinify.run(resolve, module.exports.targetJsPath, module.exports.targetJsFile, module.exports.targetJsMinFile);
        });

        jsMinifyComplete.then((successMessage) => {
          console.log(successMessage);
        });
      });
  }
};