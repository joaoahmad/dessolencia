module.exports = function(grunt){
    grunt.config('nodemon', {

        development: {
            script: 'server/bin/www',
            ignore: ['public/js/bundle.js']
        },

    });
};
