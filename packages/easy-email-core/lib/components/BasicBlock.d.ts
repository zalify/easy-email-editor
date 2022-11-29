import { IBlock } from '../typings';
import React from 'react';
export declare function BasicBlock(props: {
    params: Parameters<IBlock['render']>[0];
    tag: string;
    children?: React.ReactNode;
}): JSX.Element;
