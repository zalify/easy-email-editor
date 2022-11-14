import { IBlockData } from '../../../typings';
export declare type IColumn = IBlockData<{
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'inner-border'?: string;
    'inner-border-radius'?: string;
    padding?: string;
    'text-align'?: string;
    'vertical-align'?: string;
    width?: string;
}, {}>;
export declare const Column: import("../../../typings").IBlock<IColumn>;
