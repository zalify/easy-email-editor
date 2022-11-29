import { PopoverProps } from '@arco-design/web-react';
export interface LinkParams {
    link: string;
    blank: boolean;
    underline: boolean;
    linkNode: HTMLAnchorElement | null;
}
export interface LinkProps extends PopoverProps {
    currentRange: Range | null | undefined;
    onChange: () => void;
}
export declare function Unlink(props: LinkProps): JSX.Element;
