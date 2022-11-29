import { IBlockData, RecursivePartial } from '../typings';
export declare function mergeBlock<T extends IBlockData>(a: T, b?: RecursivePartial<T>): T;
