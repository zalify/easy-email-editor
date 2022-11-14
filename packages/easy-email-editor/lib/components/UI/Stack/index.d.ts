import React from 'react';
import { Item } from './components/Item';
declare type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';
declare type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
declare type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';
export interface StackProps {
    /** Elements to display inside stack */
    children?: React.ReactNode;
    /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
    wrap?: boolean;
    /** Stack the elements vertically */
    vertical?: boolean;
    /** Adjust spacing between elements */
    spacing?: Spacing;
    /** Adjust vertical alignment of elements */
    alignment?: Alignment;
    /** Adjust horizontal alignment of elements */
    distribution?: Distribution;
}
export declare const Stack: React.NamedExoticComponent<StackProps> & {
    Item: typeof Item;
};
export {};
