/// <reference path="../typings/tsd.d.ts" />

import fs = require('fs');
import path = require('path');
import yeoman = require('yeoman-generator');

declare var describe: any;
declare var beforeEach: any;
declare var it: any;

import helpers = yeoman.test;

function createGenerator(context, dir, name, appPath, done) {
    helpers.testDirectory(dir, function (err) {
        if (err) { return done(err); }
        this[name] = helpers.createGenerator('typescript-tmp:app', [appPath, [helpers.createDummyGenerator(), 'mocha:app']]);
        this[name].options['skip-install'] = true;
        done();
    }.bind(context));
}

describe('generator-typescript tests: Web Project', function() {
    this.timeout(2000);

    var root = path.join(__dirname, 'temp');

    beforeEach(function (done) {
        createGenerator(this, root, 'generator', '../../app', done);
    });

    it('the generator can be required without throwing', function () {
        this.app = require('../app');
    });

    it('creates expected files', function (done) {
        var expected = [
            //['ttt/ttt.d.ts', /\/\/ Type definitions for ttt v0.0.0/],
            //'ttt/ttt-tests.ts',
        ];

        helpers.mockPrompt(this.generator, <any>{
            projectName: 'MyApp',
            projectType: 'Node app',
            innerPrompt: {
                framework: 0,
                testFramework: 1,
                taskTool: 1,
                name: 'MyApp'
            }
        });

        this.generator.run({}, () => {
            helpers.assertFiles(expected);
            done();
        });
    });
});
