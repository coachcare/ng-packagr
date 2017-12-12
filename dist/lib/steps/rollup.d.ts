import * as __rollup from 'rollup';
export declare type BundleFormat = __rollup.Format;
export interface RollupOptions {
    moduleName: string;
    entry: string;
    format: BundleFormat;
    dest: string;
    externals: {
        [key: string]: string;
    };
}
/**
 * Runs rollup over the given entry file, bundling it up.
 *
 * @param opts
 */
export declare function rollup(opts: RollupOptions): Promise<void>;
