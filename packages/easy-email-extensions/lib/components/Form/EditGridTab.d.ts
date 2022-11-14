import { TabsProps } from '@arco-design/web-react';
import React from 'react';
export interface EditGridTabProps<T extends any = any> extends Omit<TabsProps, 'onChange'> {
    value: Array<T>;
    renderItem: (item: T, index: number) => React.ReactNode;
    onChange: (vals: Array<T>) => any;
    additionItem?: T;
    label: string;
}
export declare function EditGridTab<T extends any = any>(props: EditGridTabProps<T>): JSX.Element;
