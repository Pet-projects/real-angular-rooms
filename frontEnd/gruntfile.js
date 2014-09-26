module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    clean: [ 'dist', '.tmp'],

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: [ '**' ],
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
            dest: '.tmp/concat/js/app.js',
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
            src: [ '.tmp/concat/js/app.js' ]
          }
        ]
      }
    }    

  });
  
  grunt.registerTask('pre', [
    'clean',
    'copy',
    'processhtml'    
  ]);

  grunt.registerTask('build', [
    'pre',
    'concat:generated',
    'uglify:generated',
  ]);
};