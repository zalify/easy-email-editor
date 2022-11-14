import React from 'react';
interface Props extends React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> {
    children: React.ReactNode;
    title?: string;
    windowRef?: (e: Window) => void;
}
export declare const IframeComponent: ({ children, title, windowRef, ...props }: Props) => JSX.Element;
export {};
