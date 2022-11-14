import { BasicType } from '../../constants';
import { IBlockData } from '../..';
export declare function generateAdvancedContentBlock<T extends IBlockData>(option: {
    type: string;
    baseType: BasicType;
}): import("../..").IBlock<T>;
