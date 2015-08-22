"use strict";

module.exports = function (grunt) {
  var config = {};

  var tasks = [
    "grunt-react",
    "grunt-browserify",
    "grunt-bower-install-simple"
  ];

  var devTasks = [
    "grunt-contrib-watch"
  ];

  /* React
   * https://www.npmjs.com/package/grunt-react
   ----------------------------------------------------------------------- */
  config.react = {
     combined_file_output: {
       files: {
         'public/assets/javascripts/comments-app.js': [
           'app/assets/javascripts/jsx/comment.jsx',
           'app/assets/javascripts/jsx/commentForm.jsx',
           'app/assets/javascripts/jsx/commentList.jsx',
           'app/assets/javascripts/jsx/commentBox.jsx'
         ]
       }
     }
   };

  /* React
   * https://www.npmjs.com/package/grunt-react
   ----------------------------------------------------------------------- */
  config.browserify = {
    options : {
      transform:  [
        require('grunt-react').browserify
      ]
    },
    app: {
      src: "path/to/source/main.js",
      dest: "path/to/target/output.js"
    }
  };

  /* Watch
   * https://github.com/gruntjs/grunt-contrib-watch
   ----------------------------------------------------------------------- */
  config.watch = {};

  config.watch.react = {
    files: ["./app/assets/javascripts/**/*.jsx"],
    tasks: ["react"]
  };

 /* Bower
   * https://github.com/rse/grunt-bower-install-simple
   ----------------------------------------------------------------------- */
  config["bower-install-simple"] = {};

  config["bower-install-simple"].install = {
    options: {
      color: true,
      production: false,
      directory: "src/components"
    }
  };

  /* Configuration
   ----------------------------------------------------------------------- */
  grunt.initConfig(config);
  tasks.forEach(grunt.loadNpmTasks);
  if (process.env.NODE_ENV !== "production") {
    devTasks.forEach(grunt.loadNpmTasks);
  }

  /* Tasks
   ----------------------------------------------------------------------- */
  grunt.registerTask("bower", ["bower-install-simple"]);

  grunt.registerTask("dev", ["react", "watch:react"]);

  grunt.registerTask("default", ["react"]);

};
