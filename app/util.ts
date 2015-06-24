/// <reference path="../typings/tsd.d.ts" />

import chalk = require('chalk');
import path = require('path');
import fs = require('fs');
import _ = require('underscore');

export function capitalize(str: string) {
    return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

export function appyTemplate(templateFile: string, outFile: string, model: Object) {
    var data = fs.readFileSync(path.join(__dirname, templateFile)).toString();
    var template = _.template(data);
    var content = template(model);
    var targetFile = path.join(process.cwd(), outFile);
    fs.writeFileSync(targetFile, content);

    console.log(chalk.green('    created') + ' ' + path.dirname(outFile) + '/' + chalk.cyan(path.basename(outFile)));
}

export function copy(sourceFile: string, outFile: string) {
    var data = fs.readFileSync(path.join(__dirname, sourceFile)).toString();
    fs.writeFileSync(path.join(process.cwd(), outFile), data);

    console.log(chalk.green('    created') + ' ' + path.dirname(outFile) + '/' + chalk.cyan(path.basename(outFile)));
}

export function mkdir(dirName: string) {
    try {
        fs.mkdirSync(dirName);

        console.log(chalk.green('    created') + ' ' + dirName);
    } catch(e) {
        if(!e || (e && e.code === 'EEXIST')){
        } else {
            throw e;
        }
    }
}

export function isEmptySync(searchPath: string): boolean {
    try {
        var stat = fs.statSync(searchPath);
    } catch (e) {
        return true;
    }

    if (stat.isDirectory()) {
        var items = fs.readdirSync(searchPath);
        items = items.filter((f) => f != '.git');
        return !items || !items.length;
    }

    var file = fs.readFileSync(searchPath);

    return !file || !file.length;
};
