#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const ng_packagr_1 = require("../lib/ng-packagr");
const version_info_1 = require("../lib/version-info");
const DEFAULT_PROJECT_PATH = path.resolve(process.cwd(), 'ng-package.json');
function parseProjectPath(parsed) {
    return parsed || DEFAULT_PROJECT_PATH;
}
program
    .name('ng-packagr')
    .option('-V, --version', 'Prints version info')
    .option('-p, --project [path]', 'Path to the \'ng-package.json\' or \'package.json\' file.', parseProjectPath, DEFAULT_PROJECT_PATH);
program.on('option:version', () => {
    version_info_1.printVersionInfo();
    process.exit(0);
});
program
    .parse(process.argv);
ng_packagr_1.createNgPackage({ project: program.opts().project })
    .catch((err) => process.exit(111));
//# sourceMappingURL=main.js.map