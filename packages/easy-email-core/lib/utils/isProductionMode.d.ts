import { IBlockData } from '../typings';
export interface JsonToMjmlOptionProduction {
    idx?: string | null;
    data: IBlockData;
    context?: IBlockData;
    mode: 'production';
    keepClassName?: boolean;
    dataSource?: {
        [key: string]: any;
    };
    beautify?: boolean;
}
export interface JsonToMjmlOptionDev {
    data: IBlockData;
    idx: string | null;
    context?: IBlockData;
    dataSource?: {
        [key: string]: any;
    };
    mode: 'testing';
    beautify?: boolean;
}
export declare type JsonToMjmlOption = JsonToMjmlOptionDev | JsonToMjmlOptionProduction;
export declare const isProductionMode: (option: JsonToMjmlOption) => option is JsonToMjmlOptionProduction;
