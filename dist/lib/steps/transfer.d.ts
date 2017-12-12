import { Artefacts } from '../domain/build-artefacts';
import { NgEntryPoint, NgPackage } from '../domain/ng-package-format';
/**
 * Copies compiled source files from the intermediate working directory to the final locations
 * in the npm package's destination directory.
 */
export declare const copySourceFilesToDestination: ({artefacts, entryPoint, pkg}: {
    artefacts: Artefacts;
    entryPoint: NgEntryPoint;
    pkg: NgPackage;
}) => Promise<void>;
