import { IBlockData } from '../../../typings';
export declare type IPage = IBlockData<{
    'background-color'?: string;
    width: string;
}, {
    breakpoint?: string;
    headAttributes: string;
    fonts?: {
        name: string;
        href: string;
    }[];
    headStyles?: {
        content?: string;
        inline?: 'inline';
    }[];
    extraHeadContent?: string;
    responsive?: boolean;
    'font-family': string;
    'font-size': string;
    'font-weight': string;
    'line-height': string;
    'text-color': string;
    'user-style'?: {
        content?: string;
        inline?: 'inline';
    };
    'content-background-color'?: string;
}>;
export declare const Page: import("../../../typings").IBlock<IPage>;
