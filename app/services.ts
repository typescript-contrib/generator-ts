import models = require('./models');
import inquirer = require('inquirer');
import project = require('./project');
import askers = require('./askers');

export class PromptService {
    private prompts: Array<inquirer.Question> = [];

    constructor(private callback: Function) {
        //...
    }

    public add(question: inquirer.Question) {
        // TODO: vaslidate question
        this.prompts.push(question);
    }

    public ask(callback: (model: models.IProjectModel) => void): void {
        // TODO: validade
        this.callback(this.prompts, (model) => {
            this.prompts.forEach((q) => {
                model[q.name] = (<any>q).getValue(model[q.name]);
            });
            callback(model);
        });
    }
}

export interface IShell {
    mkdir(dirname: string);
    appyTemplate(templateFile: string, outFile: string, model: Object);
    copy(origin: string, target: string);
}

export interface IProjectService {
    setModel(model: models.IProjectModel): void;
    createProject(): void;
}
