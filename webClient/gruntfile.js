module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    clean: [ 'prod' ],

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: [ '**', '!**/**/*.js', '!**/bower_components/**' ],
            dest: 'prod'
          }          
        ]
      }
    },

    processhtml: {
        dist: {
          files: {
            'prod/index.html': ['prod/index.html']
          }
        }
    },

    concat: {
      generated: {
        files: [
          {
            dest: 'prod/js/app.js',
            src: ['public/**/*.js', '!public/bower_components/**']
          }
        ]
      }
    },
    
    uglify: {
      generated: {
        files: [
          {
            dest: 'prod/js/app.js',
            src: [ 'prod/js/app.js' ]
          }
        ]
      }
    }    

  });
  
  grunt.registerTask('build', [
    'clean',
    'copy',
    'processhtml',   
    'concat:generated',
    'uglify:generated'
  ]);
};