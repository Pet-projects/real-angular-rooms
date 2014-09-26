module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    clean: [ 'dist' ],

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: [ '**', '!**/**/*.js' ],
            dest: 'dist'
          }          
        ]
      }
    },

    processhtml: {
        dist: {
          files: {
            'dist/index.html': ['dist/index.html']
          }
        }
    },

    concat: {
      generated: {
        files: [
          {
            dest: 'dist/js/app.js',
            src: ['public/**/*.js', '!public/bower_components/**']
          }
        ]
      }
    },
    
    uglify: {
      generated: {
        files: [
          {
            dest: 'dist/js/app.js',
            src: [ 'dist/js/app.js' ]
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