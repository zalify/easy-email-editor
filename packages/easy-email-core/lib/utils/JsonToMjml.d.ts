import { JsonToMjmlOption } from './isProductionMode';
import { IBlockData } from '../typings';
declare type EmailRenderProps = {
    mode: 'production' | 'testing';
    context?: IBlockData;
    dataSource?: Record<string, any>;
};
export declare function JsonToMjml(options: JsonToMjmlOption): string;
export declare const useEmailRenderContext: () => EmailRenderProps;
export {};
