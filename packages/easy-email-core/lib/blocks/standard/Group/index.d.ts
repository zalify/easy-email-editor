import { IBlock, IBlockData } from '../../../typings';
export declare type IGroup = IBlockData<{
    width?: string;
    'vertical-align'?: 'middle' | 'top' | 'bottom';
    'background-color'?: string;
    direction?: 'ltr' | 'rtl';
}>;
export declare const Group: IBlock<IGroup>;
