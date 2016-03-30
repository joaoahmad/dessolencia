module.exports = function(grunt){
    grunt.config('sass', {

        dev: {
            options: {
                style: 'expanded'
            },
            files: [{
                expand: true,
                cwd: 'public/css/sass',
                src: ['*.sass'],
                dest: 'css',
                ext: '.css'
            }]
        },

        dist: {
            options: {
                style: 'compressed'
            },
            files: [{
                expand: true,
                cwd: 'public/css/sass',
                src: ['*.sass'],
                dest: 'css',
                ext: '.css'
            }]
        }

    });
};
