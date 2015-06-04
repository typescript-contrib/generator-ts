import models = require('./models');
import services = require('./services');
import askers = require('./askers');

export class ProjectMetadata {
	public name: string;
	public modelType: any;
	public serviceType: any;
	public askerType: any;
}

export class AvailableProjects {
	private static metaListByName: {[key: string]: ProjectMetadata} = {};

	public static registered(): string[] {
		var list = [];
		for(var attr in this.metaListByName) {
			list.push(attr);
		}
		return list;
	}

	public static register(name: string, serviceType: any, modelType: any, askerType: any): void {
		this.metaListByName[name] = {name, modelType, serviceType, askerType};
	}

	public static getModel(props: any): models.IProjectModel {
		var meta = this.metaListByName[props.projectType];

		if(meta == undefined) {
			throw "Name: '" + name + "' not registered.";
		}

		var model = new meta.modelType();
		model.name = meta.name;
		model.projectName = props.projectName;
		model.normalizedProjectName = props.projectName.replace(/[^A-Z0-9]/ig, '-').toLowerCase();
		return model;
	}

	public static getAsker(name: string): any {
		var meta = this.metaListByName[name];
		if(meta == undefined) {
			throw "Name: '" + name + "' not registered.";
		}

		return meta.askerType;
	}

	public static getService(name: string): any {
		var meta = this.metaListByName[name];
		if(meta == undefined) {
			throw "Name: '" + name + "' not registered.";
		}

		return meta.serviceType;
	}
}
