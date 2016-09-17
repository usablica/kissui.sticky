module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      basic: {
        src: ['./bower_components/kissui.position/position.js', './sticky.js'],
        dest: './build/sticky.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './build/sticky.js',
        dest: 'build/sticky.min.js'
      }
    },
    cssmin: {
      target: {
        files: {
          './build/sticky.min.css': ['./sticky.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);

};
