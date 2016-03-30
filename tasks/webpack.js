module.exports = function(grunt){
    grunt.config('browserify', {

        dev: {
            files: {
                'public/js/bundle.js': ['public/js/app/application.js'],
            },
            options: {
                watch: true,
                keepAlive: true,
                transform: [[ 'babelify', { presets: ["es2015", "react"] } ]]
            }
        },

        dist: {
            files: {
                'public/js/bundle.js': ['public/js/app/application.js'],
            },
            options: {
                transform: [[ 'babelify', { presets: ["es2015", "react"] } ]]
            }
        }

    });
};
