module.exports = function(grunt){
    grunt.config('concurrent', {

        watches: {
            tasks: ['browserify:dev', 'watch:styles'],
            options: {
                logConcurrentOutput: true
            }
        },

    });
};
