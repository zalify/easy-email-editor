import { IBlockData } from '../../../typings';
export declare type IHero = IBlockData<{
    'background-color'?: string;
    'background-height'?: string;
    'background-position'?: string;
    'background-url'?: string;
    'background-width'?: string;
    'vertical-align'?: string;
    'border-radius'?: string;
    width?: string;
    height?: string;
    mode: 'fluid-height' | 'fixed-height';
    padding?: string;
}, {}>;
export declare const Hero: import("../../../typings").IBlock<IHero>;
