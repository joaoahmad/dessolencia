module.exports = function(grunt){
    grunt.config('uglify', {

        bundle: {
            options: {
                sourceMap: true,
                sourceMapName: 'public/js/bundle.map'
            },
            files: {
                'public/js/bundle.js': ['public/js/bundle.js']
            }
        },

    });
};
