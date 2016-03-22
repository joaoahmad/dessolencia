module.exports = function(grunt){
    grunt.config('browserify', {

        dev: {
            files: {
                'js/bundle.js': ['js/app/application.js'],
            },
            options: {
                watch: true,
                keepAlive: true,
                transform: [[ 'babelify', { presets: ["es2015", "react"] } ]]
            }
        },

        dist: {
            files: {
                'js/bundle.js': ['js/app/application.js'],
            },
            options: {
                transform: [[ 'babelify', { presets: ["es2015", "react"] } ]]
            }
        }

    });
};
