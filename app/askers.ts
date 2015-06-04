import models = require('./models');
import inquirer = require('inquirer');
import services = require('./services');

export interface IAsker<T extends models.IProjectModel> {
    ask(callback: (model: T) => void): void;
}
