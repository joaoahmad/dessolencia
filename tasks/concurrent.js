module.exports = function(grunt){
    grunt.config('concurrent', {

        dev: {
            tasks: ['nodemon', 'browserify:dev'],
            options: {
                logConcurrentOutput: true
            }
        },

    });
};
