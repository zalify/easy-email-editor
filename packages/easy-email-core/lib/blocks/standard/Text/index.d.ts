import { IBlockData } from '../../../typings';
export declare type IText = IBlockData<{
    color?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
    height?: string;
    'text-decoration'?: string;
    'text-transform'?: string;
    align?: string;
    'container-background-color'?: string;
    width?: string;
    padding?: string;
}, {
    content: string;
}>;
export declare const Text: import("../../../typings").IBlock<IText>;
