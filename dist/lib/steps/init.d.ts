import { NgPackage } from '../domain/ng-package-format';
export declare const discoverPackages: ({project}: {
    project: string;
}) => Promise<NgPackage>;
