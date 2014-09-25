module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/**/*.js', '!public/bower_components/**'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', ['concat', 'uglify']);
};