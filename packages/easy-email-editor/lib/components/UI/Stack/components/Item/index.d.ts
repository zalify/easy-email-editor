import React from 'react';
export interface ItemProps {
    /** Elements to display inside item */
    children?: React.ReactNode;
    /** Fill the remaining horizontal space in the stack with the item  */
    fill?: boolean;
}
export declare function Item({ children, fill }: ItemProps): JSX.Element;
