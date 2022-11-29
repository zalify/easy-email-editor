import { BasicType } from '../../constants';
import { AdvancedBlock } from './generateAdvancedBlock';
export declare function generateAdvancedLayoutBlock<T extends AdvancedBlock>(option: {
    type: string;
    baseType: BasicType;
    validParentType: string[];
}): import("../..").IBlock<T>;
