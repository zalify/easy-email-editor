import { IBlock, IBlockData } from '../../../typings';
import { CSSProperties } from 'react';
export declare type IImage = IBlockData<{
    alt?: string;
    src?: string;
    title?: string;
    href?: string;
    target?: string;
    border?: string;
    height?: string;
    'text-decoration'?: string;
    'text-transform'?: CSSProperties['textTransform'];
    align?: CSSProperties['textAlign'];
    'container-background-color'?: string;
    width?: string;
    padding?: string;
}>;
export declare const Image: IBlock<IImage>;
