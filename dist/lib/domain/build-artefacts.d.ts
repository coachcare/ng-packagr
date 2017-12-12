import * as ts from 'typescript';
import { TsConfig } from '../steps/ngc';
import { NgEntryPoint, NgPackage } from './ng-package-format';
/**
 * Build artefacts generated for an entry point (Angular library).
 *
 * The artefacts include distribution-ready 'binaries' as well as temporary files and
 * intermediate build output.
 */
export declare class Artefacts {
    /** Directory for temporary files */
    stageDir: string;
    /** Directory for build output */
    outDir: string;
    private _extras;
    constructor(entryPoint: NgEntryPoint, pkg: NgPackage);
    extras<T>(key: string): T;
    extras<T>(key: string, value: T): any;
    tsConfig: TsConfig;
    tsSources: ts.TransformationResult<ts.SourceFile>;
    template(file: string): string;
    template(file: string, content: string): any;
    templates(): string[];
    stylesheet(file: string): string;
    stylesheet(file: string, content: string): any;
    stylesheets(): string[];
}
