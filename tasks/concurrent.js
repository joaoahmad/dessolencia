module.exports = function(grunt){
    grunt.config('concurrent', {

        watches: {
            tasks: ['nodemon:development', 'browserify:dev', 'watch:styles'],
            options: {
                logConcurrentOutput: true,
                limit: 3
            }
        },

    });
};
