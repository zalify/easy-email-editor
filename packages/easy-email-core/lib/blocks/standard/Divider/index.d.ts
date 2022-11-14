import { IBlockData } from '../../../typings';
export declare type IDivider = IBlockData<{
    'border-color'?: string;
    'border-style'?: string;
    'border-width'?: string;
    'container-background-color'?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    padding?: string;
}, {}>;
export declare const Divider: import("../../../typings").IBlock<IDivider>;
