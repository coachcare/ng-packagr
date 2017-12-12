"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * An Angular package being built.
 *
 * #### Representation in the domain
 *
 * Angular Package Format defines the terms _Package_ and _Entry Point_.
 * A _Package_ is a "set of files that are published to NPM and installed together".
 * An _Entry Point_ is "referenced by a unique module ID and exports the public API referenced
 * by that module ID. An example is @angular/core or @angular/core/testing. Both entry points
 * exist in the @angular/core package, but they export different symbols. A package can have
 * many entry points."
 *
 * The term 'Package' is reflected by the domain class `NgPackage`.
 * An `NgPackage` is transformed to exactly one distribution-ready npm package.
 * Further, an `NgPackage` is composed of at least one entrypoint, one primary entry point and
 * zero or more secondary entry points.
 * Each of those entrypoints is reflected by `NgLibrary` and is considered the root of the source
 * code compilation / transformation process.
 *
 * #### Watch Out
 *
 * The user's configuration `ngPackage` suggests that the configuration object is reflected by
 * `NgPackage`. Is is not.
 *
 * The user's `ngPackage` configueation is represented in `NgEntryPoint`. In case of the
 * _Package_ (`NgPackage`), the configuration is reflected in the primary `NgEntryPoint`.
 *
 * @link https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#
 */
class NgPackage {
    constructor(basePath, 
        /**
         * A reference to the primary entry point.
         */
        primary, 
        /**
         * An array of seconary entry points.
         */
        secondaries = []) {
        this.basePath = basePath;
        this.primary = primary;
        this.secondaries = secondaries;
    }
    /** Absolute path of the package's source directory. */
    get src() {
        return this.absolutePathFromPrimary('src');
    }
    /** Absolute path of the package's destination directory. */
    get dest() {
        return this.absolutePathFromPrimary('dest');
    }
    /** Absolute path of the package's working directory (used for intermediate file storage). */
    get workingDirectory() {
        return this.absolutePathFromPrimary('workingDirectory');
    }
    absolutePathFromPrimary(key) {
        return path.resolve(this.basePath, this.primary.$get(key));
    }
}
exports.NgPackage = NgPackage;
/**
 * An Angular library being compiled and transpiled to Angular Package Format.
 *
 * #### Relationship in the domain
 *
 * _TBD_ the thing that - in effect - gets compiled from `*.ts`, `*.html`, `*.css` (and so on)
 * to FESM'5, FESM2015, UMD, AoT metadata, typings.
 *
 * An `NgEntryPoint` serves as the root of a library's source tree.
 * During the compilation process (a tree transformation / transformation pipeline) it will be
 * transpiled to a set of artefacts such as a FESM'5 bundle, a FESM2015 bundle, AoT metadata,
 * and so on.
 * The set of artefacts is reflected in `NgArtefacts`.
 */
class NgEntryPoint {
    constructor(packageJson, ngPackageJson, $schema, basePath, secondaryData) {
        this.packageJson = packageJson;
        this.ngPackageJson = ngPackageJson;
        this.$schema = $schema;
        this.basePath = basePath;
        this.secondaryData = secondaryData;
    }
    /** Absolute file path of the entry point's source code entry file. */
    get entryFilePath() {
        return path.resolve(this.basePath, this.entryFile);
    }
    /** Absolute directory path of the entry point's 'package.json'. */
    get destinationPath() {
        if (this.secondaryData) {
            return this.secondaryData.destinationPath;
        }
        else {
            return path.resolve(this.basePath, this.$get('dest'));
        }
    }
    $get(key) {
        return this.$schema.$$get(key);
    }
    get src() {
        return this.$get('src');
    }
    get paths() {
        return this.$get('paths');
    }
    get entryFile() {
        return this.$get('lib.entryFile');
    }
    get cssUrl() {
        return this.$get('lib.cssUrl');
    }
    get externals() {
        return this.$get('lib.externals');
    }
    get jsxConfig() {
        return this.$get('lib.jsx');
    }
    get flatModuleFile() {
        return this.$get('lib.flatModuleFile') || this.flattenModuleId('-');
    }
    /**
     * The module ID is an "identifier of a module used in the import statements, e.g.
     * '@angular/core'. The ID often maps directly to a path on the filesystem, but this
     * is not always the case due to various module resolution strategies."
     */
    get moduleId() {
        if (this.secondaryData) {
            return this.secondaryData.moduleId;
        }
        else {
            return this.packageJson['name'];
        }
    }
    /**
     * The UMD module ID is a string value used for registering the module on the old-fashioned
     * JavaScript global scope.
     * Example: `@my/foo/bar` registers as `global['my']['foo']['bar']`.
     */
    get umdModuleId() {
        return this.flattenModuleId();
    }
    flattenModuleId(separator = '.') {
        if (this.moduleId.startsWith('@')) {
            return this.moduleId.substring(1).split('/').join(separator);
        }
        else {
            return this.moduleId.split('/').join(separator);
        }
    }
}
exports.NgEntryPoint = NgEntryPoint;
var CssUrl;
(function (CssUrl) {
    CssUrl["inline"] = "inline";
    CssUrl["none"] = "none";
})(CssUrl = exports.CssUrl || (exports.CssUrl = {}));
//# sourceMappingURL=ng-package-format.js.map