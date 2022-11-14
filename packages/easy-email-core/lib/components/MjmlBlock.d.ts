import React from 'react';
import { IBlockData, RecursivePartial } from '../typings';
export interface MjmlBlockProps<T extends IBlockData> {
    idx?: string | null;
    type: T['type'];
    value?: RecursivePartial<T['data']['value']>;
    attributes?: RecursivePartial<T['attributes']>;
    children?: React.ReactNode;
}
export default function MjmlBlock<T extends IBlockData>({ idx, value, type, attributes, children, }: MjmlBlockProps<T>): JSX.Element;
