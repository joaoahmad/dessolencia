module.exports = function(grunt){
    grunt.config('uglify', {

        bundle: {
            options: {
                sourceMap: true,
                sourceMapName: 'js/bundle.map'
            },
            files: {
                'js/bundle.js': ['js/bundle.js']
            }
        },

    });
};