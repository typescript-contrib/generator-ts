import models = require('../models');
import services = require('../services');
import askers = require('../askers');
import project = require('../project');
import util = require('../util');

export class AtomPackageProjectModel implements models.IProjectModel {
    public name: string;
    public projectName: string;
    public normalizedProjectName: string;
    public capitalizedProjectName: string;
}

export class AtomPackageProjectAsker implements askers.IAsker<AtomPackageProjectModel> {

    constructor(private promptservice: services.PromptService) {
        //...
    }

    public ask(callback: (model: AtomPackageProjectModel) => void): void {
        this.promptservice.ask(callback);
    }
}

export class AtomPackageProjectService implements services.IProjectService {
    private templatePath: string = 'project-types/atom-package/templates/';
    private model: AtomPackageProjectModel;

    public setModel(model: AtomPackageProjectModel): void {
        this.model = model;
    }

    public createProject(): void {
        console.log(this.model);
        util.mkdir('lib');
        util.mkdir('keymaps');
        util.mkdir('menus');
        util.mkdir('styles');

        util.mkdir('typings');
        util.appyTemplate(`${this.templatePath}typings/_tsd.d.ts.tmpl`, 'typings/tsd.d.ts', this.model);
        util.appyTemplate(`${this.templatePath}_tsd.json.tmpl`, 'tsd.json', this.model);

        util.mkdir('typings/atom-event-kit');
        util.copy(`${this.templatePath}typings/atom-event-kit/_event-kit.d.ts.tmpl`, 'typings/atom-event-kit/event-kit.d.ts');
        util.appyTemplate(`${this.templatePath}typings/_.d.ts.tmpl`, 'typings/' + this.model.normalizedProjectName + '.d.ts', this.model);

        util.appyTemplate(`${this.templatePath}_README.md`, 'README.md', this.model);
        util.copy(`${this.templatePath}_.editorconfig.tmpl`, '.editorconfig');
        util.copy(`${this.templatePath}_.gitattributes.tmpl`, '.gitattributes');
        util.copy(`${this.templatePath}_.gitignore.tmpl`, '.gitignore');
        util.copy(`${this.templatePath}_tslintrc.json`, 'tslintrc.json');

        util.appyTemplate(`${this.templatePath}lib/_view.ts.tmpl`, 'lib/' + this.model.normalizedProjectName + '-view.ts', this.model);
        util.appyTemplate(`${this.templatePath}lib/_.ts.tmpl`, 'lib/' + this.model.normalizedProjectName + '.ts', this.model);
        util.appyTemplate(`${this.templatePath}keymaps/_.cson.tmpl`, 'keymaps/' + this.model.normalizedProjectName + '.cson', this.model);
        util.appyTemplate(`${this.templatePath}menus/_.cson.tmpl`, 'menus/' + this.model.normalizedProjectName + '.cson', this.model);
        util.appyTemplate(`${this.templatePath}styles/_.less.tmpl`, 'styles/' + this.model.normalizedProjectName + '.less', this.model);
        util.appyTemplate(`${this.templatePath}_package.json.tmpl`, 'package.json', this.model);

        util.mkdir('spec');
        util.appyTemplate(`${this.templatePath}spec/_-spec.ts.tmpl`, 'spec/' + this.model.normalizedProjectName + '-spec.ts', this.model);
        util.appyTemplate(`${this.templatePath}spec/_-view-spec.ts.tmpl`, 'spec/' + this.model.normalizedProjectName + '-view-spec.ts', this.model);

        util.appyTemplate(`${this.templatePath}_Gruntfile.js.tmpl`, 'Gruntfile.js', this.model);

        console.log('');
        console.log('> Congrats! Your app has been created!');
        console.log('> Next steps, execute the following commands');
        console.log('    npm install');
        console.log('    tsd reinstall');
        console.log('    apm link');
        console.log('');
    }
}

project.AvailableProjects.register(
    'Atom Package',
    AtomPackageProjectService,
    AtomPackageProjectModel,
    AtomPackageProjectAsker);
