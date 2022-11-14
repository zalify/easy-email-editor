import React from 'react';
import { IBlockDataWithId } from '../..';
export declare function EyeIcon({ blockData, hidden, onToggleVisible, }: {
    blockData: IBlockDataWithId;
    hidden?: boolean;
    onToggleVisible: (blockData: IBlockDataWithId, ev: React.MouseEvent) => void;
}): JSX.Element | null;
