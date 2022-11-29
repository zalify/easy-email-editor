import { IBlock, IBlockData } from '../../../typings';
export type ISpacer = IBlockData<{
    'container-background-color'?: string;
    height?: string;
    padding?: string;
}>;
export declare const Spacer: IBlock<ISpacer>;
