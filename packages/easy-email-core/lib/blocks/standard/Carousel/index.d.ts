import { IBlockData } from '../../../typings';
export declare type ICarousel = IBlockData<{
    align?: string;
    'background-color'?: string;
    'border-radius'?: string;
    'icon-width'?: string;
    'left-icon'?: string;
    'right-icon'?: string;
    'tb-border'?: string;
    'tb-border-radius'?: string;
    'tb-hover-border-color'?: string;
    'tb-selected-border-color'?: string;
    'tb-width'?: string;
    thumbnails?: string;
}, {
    images: Array<{
        src: string;
        target: string;
        href?: string;
        'thumbnails-src'?: string;
        title?: string;
        rel?: string;
        alt?: string;
    }>;
}>;
export declare const Carousel: import("../../../typings").IBlock<ICarousel>;
