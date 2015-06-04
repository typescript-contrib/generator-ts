/// <reference path="../inquirer/inquirer.d.ts" />
/// <reference path="../chalk/chalk.d.ts" />

declare module yeoman {
    export module generators {
        
        export interface IgeneratorBase {
            init(): void;
            askFor() : void;
            app(): void;
        }
        
        export class Base {
            static extend(obj: any);

            options: Object;
            
            on(event: string, callback: () => void): void;
            async(): any;
            log(msg: string|Chalk.ChalkChain): any;
            prompt(prompts: Array<inquirer.Question>, callback: (props: any) => void): any;
        }
    }

    export var test: any;
}

declare module "yeoman-generator" {
    export = yeoman;
}
