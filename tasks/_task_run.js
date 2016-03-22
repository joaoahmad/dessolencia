module.exports = function(grunt){
  grunt.registerTask('run', ['sass:dev','postcss:dev']);
};