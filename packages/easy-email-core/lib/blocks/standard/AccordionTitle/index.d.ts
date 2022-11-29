import { IBlock, IBlockData } from '../../../typings';
export type IAccordionTitle = IBlockData<{
    color?: string;
    'background-color'?: string;
    'font-size'?: string;
    'font-family'?: string;
    padding?: string;
}, {}>;
export declare const AccordionTitle: IBlock;
