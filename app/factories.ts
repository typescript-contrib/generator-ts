import models = require('./models');
import services = require('./services');
import askers = require('./askers');
import project = require('./project');

export class ModelFactory {

    public static factory(props: any): models.IProjectModel {
        var model = project.AvailableProjects.getModel(props);
        if(model == undefined) {
            throw `Invalid project: ${name}`;
        }
        return model;
    }
}

export class Askerfactory {

    public static factory<T extends models.IProjectModel>(promptService: services.PromptService, model: T): askers.IAsker<T> {
        var asker = project.AvailableProjects.getAsker(model.name);
        if(asker == undefined) {
            throw `Invalid asker to: ${model.name}`;
        }
        return new asker(promptService);
    }
}

export class ProjectServiceFactory {

    public static factory<T extends models.IProjectModel>(model: T): services.IProjectService {
        var service = project.AvailableProjects.getService(model.name);
        if(!service) {
            throw `Invalid service type: ${model.name}`;
        }
        return new service();
    }
}
