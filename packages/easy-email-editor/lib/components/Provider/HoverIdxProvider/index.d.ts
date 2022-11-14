import React from 'react';
export interface HoverIdxState {
    hoverIdx: string;
}
export interface DragPosition {
    left: number;
    top: number;
}
export interface DataTransfer {
    type: string;
    payload?: any;
    action: 'add' | 'move';
    positionIndex?: number;
    parentIdx?: string;
    sourceIdx?: string;
}
export declare const HoverIdxContext: React.Context<{
    hoverIdx: string;
    isDragging: boolean;
    setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    direction: string;
    setDirection: React.Dispatch<React.SetStateAction<string>>;
    dataTransfer: DataTransfer | null;
    setDataTransfer: React.Dispatch<React.SetStateAction<DataTransfer | null>>;
}>;
export declare const HoverIdxProvider: React.FC<{}>;
