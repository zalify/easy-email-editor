import React from 'react';
export interface InlineTextProps {
    idx: string;
    children?: React.ReactNode;
    onChange: (content: string) => void;
}
export declare function InlineText({ idx, onChange, children }: InlineTextProps): JSX.Element;
