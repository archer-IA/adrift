module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: "app/assets/src/js/*.js",
        dest: "app/assets/js/script.min.js"
      },
      dev: {
        options: {
          beatify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        src: "app/assets/src/js/*.js",
        dest: "app/assets/js/script.min.js"
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'app/assets/css/styles.css' : 'app/assets/src/scss/**/*.scss'
        } 
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'app/assets/css/styles.css' : 'app/assets/src/scss/**/*.scss'
        }
      }
    },
    watch: {
      js: {
        files: ['app/assets/src/js/*'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['app/assets/src/scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    }
    
  })

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');


  grunt.registerTask('default', ['uglify:dev', 'sass:dev']);
  grunt.registerTask('build', ['uglify:build']);
  grunt.registerTask('dev', ['uglify:dev', 'sass:build']);

}