module.exports = function (grunt) {

    var package = require('./package.json');
    var dest = package.buildInfo.contentAppName + '/' + package.buildInfo.contentVersion,
        contentFileName = package.buildInfo.contentPath + package.buildInfo.contentFileName;
    console.log(dest);
    grunt.initConfig({
        distRootFolder: dest,
        appName: package.buildInfo.contentAppName,
        copy: {
            'js': {
                src: '**/*',           // copy all files and subfolders
                cwd:"dist/",
                flatten: false,
                expand:true,
                dest: 'build/new-dashboard/v1/'
            },
        },
        zip: {
            main: {
                src: ['build/new-dashboard/v1/**/*'],
                cwd: './build/',
                dest: '../target/new-dashboard.content',
                compression: 'DEFLATE'
            }
        },
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['build']);
    // simple build task
    grunt.registerTask('build', [
        'copy',
        'zip'
    ]);


};
