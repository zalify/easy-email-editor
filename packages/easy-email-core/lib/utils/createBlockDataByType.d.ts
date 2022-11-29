import { IBlockData, RecursivePartial } from '../typings';
export declare function createBlockDataByType<T extends IBlockData>(type: string, payload?: RecursivePartial<T>): IBlockData;
