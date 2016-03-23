module.exports = function(grunt){
    grunt.config('nodemon', {

        dev: {
            script: 'server.js',
            ignore: ['js/bundle.js']
        }

    });
};
