module.exports = function(grunt){
    grunt.config('watch', {

        styles: {
            files: ['css/sass/**/*.sass', 'css/sass/**/*.scss'],
            tasks: ['sass:dev']
        },

        // scripts: {
        //     files: ['js/app/**/*.js', 'js/app/**/*.jsx', 'js/app/**/*.hbs'],
        //     tasks: ['browserify:dev']
        // },

    });
};
