import util = require('./util');

export function generate(name: string) {
    var model: any = {};
    model.name = name;
    model.dirName = name.replace(/[^A-Z0-9]/ig, '-').toLowerCase();
    model.normalizedName = util.capitalize(name).replace(/[^A-Z0-9]/ig, '');

    util.mkdir('app/project-types/' + model.dirName);
    util.appyTemplate('../app/_new-type.ts.tmpl', 'app/project-types/' + model.dirName + '.ts', model);
}
