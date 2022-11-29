import React from 'react';
export interface HoverIdxState {
    hoverIdx: string;
}
export declare const ScrollContext: React.Context<{
    scrollHeight: React.MutableRefObject<number>;
    viewElementRef: React.MutableRefObject<null | {
        selector: string;
        top: number;
    }>;
}>;
export declare const ScrollProvider: React.FC<{}>;
