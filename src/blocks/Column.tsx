import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IColumn } from '@/components/core/blocks/basic/Column';
import MjmlBlock from '@/components/core/MjmlBlock';

export type ColumnProps = RecursivePartial<IColumn['data']> &
  RecursivePartial<IColumn['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Column(props: ColumnProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.COLUMN}
    >
      {props.children}
    </MjmlBlock>
  );
}
