import { PopoverProps } from '@arco-design/web-react';
export interface LinkProps extends PopoverProps {
    currentRange: Range | null | undefined;
    onChange: () => void;
}
export declare function Italic(props: LinkProps): JSX.Element;
