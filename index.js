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
  targetPath: 'target',
  targetSassFile: 'site.css',
  targetCssFile: 'site.min.css',
  targetJsFile: 'site.js',
  targetJsMinFile: 'site.min.js',
  run: function () {
    /*
	Configuration
 */
    function init () {
      "use strict";

      // Sass
      let sassCompileComplete = new Promise((resolve, reject) => {
        sass.run(resolve, sassPath, targetPath, targetSassFile);
      });

      sassCompileComplete.then((successMessage) => {
        console.log(successMessage);

        // Minify
        let cssMinifyComplete = new Promise((resolve, reject) => {
          cssMinify.run(resolve, targetPath, targetSassFile, targetCssFile);
        });

        cssMinifyComplete.then((successMessage) => {
          console.log(successMessage);
        });
      });

      // Js
      let jsConcatComplete = new Promise((resolve, reject) => {
        jsConcat.run(resolve, jsPath, targetPath, targetJsFile);
      });

      jsConcatComplete.then((successMessage) => {
        console.log(successMessage);
        let jsMinifyComplete = new Promise((resolve, reject) => {
          jsMinify.run(resolve, targetPath, targetJsFile, targetJsMinFile);
        });

        jsMinifyComplete.then((successMessage) => {
          console.log(successMessage);
        });
      });


    }
  }
};