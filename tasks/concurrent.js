module.exports = function(grunt){
    grunt.config('concurrent', {

        watches: {
            tasks: ['browserify:dev','watch:styles'],
            options: {
                logConcurrentOutput: true
            }
        },

        // scripts: {
        //     files: ['js/app/**/*.js', 'js/app/**/*.jsx', 'js/app/**/*.hbs'],
        //     tasks: ['browserify:dev']
        // },

    });
};
