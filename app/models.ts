/// <reference path="../typings/tsd.d.ts" />

'use strict';

export interface IProjectModel {
    name: string;
    normalizedProjectName: string;
    projectName: string;
}

export enum WebFramework {
    None,
    AngularJs,
    Backbone,
    Knockout
}

export enum TestFramework {
    None,
    Jasmine,
    QUnit
}

export enum TaskTool {
    None,
    Grunt,
    Gulp
}
