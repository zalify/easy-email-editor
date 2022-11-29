import React from 'react';
interface Props {
    children: React.ReactNode;
    title?: string;
    windowRef?: (e: Window) => void;
    isActive?: boolean;
    style?: React.CSSProperties;
}
export declare const SyncScrollIframeComponent: ({ children, title, windowRef, isActive, style }: Props) => JSX.Element;
export {};
