"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __rollup = require("rollup");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonJs = require("rollup-plugin-commonjs");
const path = require("path");
const log = require("../util/log");
const rollup_globals_1 = require("../conf/rollup.globals");
const ROLLUP_VERSION = __rollup.VERSION;
/**
 * Runs rollup over the given entry file, bundling it up.
 *
 * @param opts
 */
function rollup(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug(`rollup (v${ROLLUP_VERSION}) ${opts.entry} to ${opts.dest} (${opts.format})`);
        const globals = Object.assign({}, rollup_globals_1.ROLLUP_GLOBALS, opts.externals);
        const globalsKeys = Object.keys(globals);
        // Create the bundle
        const bundle = yield __rollup.rollup({
            context: 'this',
            external: (moduleId) => {
                const isExplicitExternal = globalsKeys.some((global) => global === moduleId);
                if (isExplicitExternal === true) {
                    return true;
                }
                // Determine from the path
                if (moduleId.startsWith('/')) {
                    const moduleIdPath = path.parse(moduleId);
                    const entryPath = path.parse(opts.entry);
                    // `moduleId` is a file in the sub-tree of `opts.entry` -> inline to bundle
                    if (moduleIdPath.dir.startsWith(entryPath.dir)) {
                        return false;
                    }
                }
                // XX: by default, the referenced module is inlined
                return false;
            },
            input: opts.entry,
            plugins: [
                nodeResolve({ jsnext: true, module: true }),
                commonJs(),
            ],
            onwarn: (warning) => {
                if (warning.code === 'THIS_IS_UNDEFINED') {
                    return;
                }
                log.warn(warning.message);
            }
        });
        // Output the bundle to disk
        yield bundle.write({
            // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
            moduleId: '',
            name: `${opts.moduleName}`,
            file: opts.dest,
            format: opts.format,
            banner: '',
            globals: globals,
            sourcemap: true
        });
    });
}
exports.rollup = rollup;
//# sourceMappingURL=rollup.js.map