import React from 'react';
import { useBlock } from 'easy-email-editor';
import { IBlockDataWithId } from '../../../BlockLayer';
export declare function ContextMenu({ moveBlock, copyBlock, removeBlock, contextMenuData, onClose, }: {
    onClose: (ev?: React.MouseEvent) => void;
    moveBlock: ReturnType<typeof useBlock>['moveBlock'];
    copyBlock: ReturnType<typeof useBlock>['copyBlock'];
    removeBlock: ReturnType<typeof useBlock>['removeBlock'];
    contextMenuData: {
        blockData: IBlockDataWithId;
        left: number;
        top: number;
    };
}): JSX.Element;
