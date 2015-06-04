import models = require('../models');
import services = require('../services');
import askers = require('../askers');
import project = require('../project');
import util = require('../util');

export class NodeAppProjectModel implements models.IProjectModel {
    public name: string;
    public projectName: string;
    public normalizedProjectName: string;
    public capitalizedProjectName: string;
    public testFramework: models.TestFramework;
    public taskTool: models.TaskTool;
}

export class NodeAppProjectAsker implements askers.IAsker<NodeAppProjectModel> {

    constructor(private promptservice: services.PromptService) {
        //...
    }

    public ask(callback: (model: NodeAppProjectModel) => void): void {
        this.promptservice.add({
            type: 'list',
            choices: ['Yes, use Jasmine', /*'Yes, use QUnit', */'No, without tests'],
            name: 'testFramework',
            getValue: function(value) {
                switch(value) {
                    case 'Yes, use Jasmine':
                        return models.TestFramework.Jasmine;
                    case 'Yes, use QUnit':
                        return models.TestFramework.QUnit;
                }
                return models.TestFramework.None;
            },
            message: 'Do you want to use automatic tests?',
            validate: (answer: string) => {
                return true;
            }
        });

        this.promptservice.add({
            type: 'list',
            choices: ['Grunt'/*, 'Gulp'*/],
            name: 'taskTool',
            getValue: function(value) {
                switch(value) {
                    case 'Grunt':
                        return models.TaskTool.Grunt;
                    case 'Gulp':
                        return models.TaskTool.Gulp;
                }
                return models.TaskTool.None;
            },
            message: 'What task tool do you want to use?',
            validate: (answer: string) => {
                return true;
            }
        });

        this.promptservice.ask(callback);
    }
}

export class NodeAppProjectService implements services.IProjectService {
    private templatePath: string = 'project-types/node-app/templates/';
    private model: NodeAppProjectModel;

    public setModel(model: NodeAppProjectModel): void {
        this.model = model;
    }

    public createProject(): void {
        util.mkdir('src');
        util.mkdir('dist');
        util.mkdir('typings');
        util.appyTemplate(`${this.templatePath}typings/_tsd.d.ts.tmpl`, 'typings/tsd.d.ts', this.model);
        util.appyTemplate(`${this.templatePath}_tsd.json.tmpl`, 'tsd.json', this.model);

        if (this.model.testFramework != models.TestFramework.None) {
            util.mkdir('test');
            if (this.model.testFramework == models.TestFramework.Jasmine) {
                util.mkdir('test/spec');
                util.copy(`${this.templatePath}test/spec/_exampleSpec.ts.tmpl`, 'test/spec/exampleSpec.ts');
            }
        }

        util.mkdir('.settings');
        util.copy(`${this.templatePath}src/_main.ts.tmpl`, 'src/main.ts');
        util.appyTemplate(`${this.templatePath}_package.json.tmpl`, 'package.json', this.model);
        util.appyTemplate(`${this.templatePath}_Gruntfile.js.tmpl`, 'Gruntfile.js', this.model);
        util.copy(`${this.templatePath}_tslintrc.json`, 'tslintrc.json');

        util.appyTemplate(`${this.templatePath}_README.md`, 'README.md', this.model);

        util.copy(`${this.templatePath}_appveyor.yml`, 'appveyor.yml');
        util.copy(`${this.templatePath}.settings/_task.json.tmpl`, '.settings/task.json');
        util.copy(`${this.templatePath}_.gitignore.tmpl`, '.gitignore');
        util.copy(`${this.templatePath}_.travis.yml.tmpl`, '.travis.yml');
        util.copy(`${this.templatePath}_.gitattributes.tmpl`, '.gitattributes');
        util.copy(`${this.templatePath}_.editorconfig.tmpl`, '.editorconfig');

        console.log('');
        console.log('> Congrats! Your app has been created!');
        console.log('> Next steps, execute the following commands');
        console.log('    npm install');
        console.log('    tsd reinstall');
        console.log('    grunt');
        console.log('');
    }
}

project.AvailableProjects.register(
    'Node app',
    NodeAppProjectService,
    NodeAppProjectModel,
    NodeAppProjectAsker);
