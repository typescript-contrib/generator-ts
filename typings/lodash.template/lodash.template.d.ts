declare module LodashTemplate {
    export function template(template: string): any;
}

declare module "lodash.template" {
    export = LodashTemplate;
}
