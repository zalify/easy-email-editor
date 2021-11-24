import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IColumn } from '@core/blocks/Column';
import MjmlBlock from '@core/components/MjmlBlock';

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
