import React from 'react';
import { IBlockData } from 'easy-email-core';
export interface IBlockDataWithId extends IBlockData {
    id: string;
    icon?: React.ReactElement;
    parent: IBlockDataWithId | null;
    children: IBlockDataWithId[];
    className?: string;
}
export interface BlockLayerProps {
    renderTitle?: (block: IBlockDataWithId) => React.ReactNode;
}
export declare function BlockLayer(props: BlockLayerProps): JSX.Element | null;
