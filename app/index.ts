/// <reference path="../typings/tsd.d.ts" />

'use strict';

import path = require('path');
import fs = require('fs');

import chalk = require('chalk');
import yeoman = require('yeoman-generator');

import factories = require('./factories');
import askers = require('./askers');
import models = require('./models');
import services = require('./services');
import project = require('./project');

import util = require('./util');
import loader = require('./project-types/_loader');

[loader];

var greet = "\n\
   ____                           _                _____           \n\
  / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __   |_   _|__        \n\
 | |  _ / _ \\ '_ \\ / _ \\ '__/ _\` | __/ _ \\| '__|____| |/ __|  \n\
 | |_| |  __/ | | |  __/ | | (_| | || (_) | | |_____| |\\__ \\     \n\
  \\____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|       |_||___/ \n\
";

class TypeScriptGenerator extends yeoman.generators.Base implements yeoman.generators.IgeneratorBase {

    private service: services.IProjectService;
    private model: models.IProjectModel;

    public init(): void {
        this.on('end', this.onEnd);
    }

    public askFor(): void {
        var done = this.async();
        var self = this;

        this.log(greet);
        this.log(chalk.white(' Welcome to TypeScript project generator!\n'));

        if (!util.isEmptySync('.')){
            this.log(chalk.red(' Sorry! The current folder is not empty.\n'));
            process.exit(1);
            return;
        }

        var prompts: Array<inquirer.Question> = [];

        prompts.push({
            name: 'projectName',
            message: 'What\'s the name of your project?',
            validate: (answer: string) => {
                // TODO: validar nome
                return true;
            }
        });

        prompts.push({
            type: 'list',
            choices: project.AvailableProjects.registered(),
            name: 'projectType',
            message: 'What kind of project you want to create?',
            validate: (answer: string) => {
                return true;
            }
        });

        this.prompt(prompts, function(props) {
            this.model = factories.ModelFactory.factory(props);

            var promptService = new services.PromptService((prompts, callback) => {
                if(prompts.length > 0) {
                    self.prompt(prompts, callback);
                } else {
                    callback(this.model);
                }
            });

            var asker = factories.Askerfactory.factory(promptService, this.model);
            self.service = factories.ProjectServiceFactory.factory(this.model);

            if(!props.innerPrompt) {
                asker.ask((model) => {

                    for (var attr in model) {
                        this.model[attr] = model[attr];
                    }

                    self.service.setModel(this.model);
                    done();
                });
            } else {
                self.service.setModel(props.innerPrompt);
                done();
            }
        }.bind(this));
    }

    public app(): void {
        this.service.createProject();
    }

    private onEnd() {
        if (!this.options['skip-install']) {
            //...
        }
    }
}

export = TypeScriptGenerator;
