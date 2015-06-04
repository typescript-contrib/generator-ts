module.exports = function(grunt) {
    'use strict';

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            js: ['test/temp*', 'dist']
        },
        ts: {
            build: {
                src: ['app/**/*.ts', 'test/**/*.ts', '!test/temp*/**/*.*'],
                options: {
                    target: 'es3',
                    module: 'commonjs',
                    sourceMap: false,
                    declaration: false,
                    removeComments: true,
                    compiler: './node_modules/typescript/bin/tsc'
                },
            }
        },
        /*jshint: {
            all: ['Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },*/
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslintrc.json')
            },
            all: {
                src: ['app/**/*.ts', 'test/**/*.ts', '!test/temp*/**/*.*']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js', '!test/temp*/**/*.*']
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**/*.js'], dest: 'dist/'}
                ]
            },
            templates: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**/templates/**/*.*'], dest: 'dist/'}
                ]
            },
        }
    });

    grunt.registerTask('new-type', function() {
        var done = this.async();

        var path = require('path');
        var generator = require(path.join(__dirname, 'dist/_new-type-generator'));

        if (grunt.option('name')) {
            generator.generate(grunt.option('name'));
        } else {
            console.log('!ERROR: Missing a project type name');
        }

        done();
    });

    grunt.registerTask('default', ['clean', /*'jshint:all', 'tslint:all', */'ts:build'/*, 'mochaTest'*/]);
};
