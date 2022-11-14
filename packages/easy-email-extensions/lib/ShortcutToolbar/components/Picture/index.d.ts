import React from 'react';
interface IPictureProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLElement> {
    src: string;
    className?: string;
}
export declare function Picture(props: IPictureProps): JSX.Element;
export {};
