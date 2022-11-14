import { IBlock, IBlockData } from '../../../typings';
export declare type INavbar = IBlockData<{
    align?: string;
    hamburger?: string;
    'ico-align'?: string;
    'ico-color'?: string;
    'ico-font-size'?: string;
    'ico-line-height'?: string;
    'ico-padding'?: string;
    'ico-text-decoration'?: string;
    'ico-text-transform'?: string;
}, {
    links: Array<{
        content: string;
        color?: string;
        href?: string;
        'font-family'?: string;
        'font-size'?: string;
        'font-style'?: string;
        'font-weight'?: string;
        'line-height'?: string;
        'text-decoration'?: string;
        target?: string;
        padding?: string;
    }>;
}>;
export declare const Navbar: IBlock<INavbar>;
