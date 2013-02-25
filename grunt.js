module.exports = function(grunt) {
    grunt.initConfig({
        meta: {
            name: 'lsys.js',
            version: 'v0.1.0',
            author: 'rtsan',
            repo: 'https://github.com/rtsan/lsys.js',
            banner:
                '/*\n' +
                ' * <%= meta.name %> <%= meta.version %>\n' +
                ' * <%= meta.repo %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= meta.author %>\n' +
                ' * Licensed under the MIT license.\n' +
                ' */',
            min_banner: '/* <%= meta.name %> <%= meta.version %> Licensed under the MIT license. (c) <%= grunt.template.today("yyyy") %> <%= meta.author %> */'
        },
        concat: {
            dist: {
                src: [
                    '<banner:meta.banner>',
                    'src/_header.js',
                    'src/Operator.js',
                    'src/Rule.js',
                    'src/LSystem.js',
                    'src/_exports.js',
                    'src/_footer.js'
                ],
                dest: 'lsys.js'
            }
        },
        lint: {
            files: [ 'lsys.js' ]
        },
        qunit: [
            'qunit/test.html'
        ],
        min: {
            dist: {
                src: [
                    '<banner:meta.min_banner>',
                    'lsys.js'
                ],
                dest: 'lsys.min.js'
            }
        }
    });
    grunt.registerTask('default', 'concat lint qunit min');
};
