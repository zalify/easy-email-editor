import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { ITable } from '@/components/core/blocks/basic/Table';
import MjmlBlock from '@/components/core/MjmlBlock';

export type TableProps = RecursivePartial<ITable['data']> &
  RecursivePartial<ITable['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Table(props: TableProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.TABLE}
    >
      {props.children}
    </MjmlBlock>
  );
}
