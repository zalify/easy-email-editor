import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { ITable } from '@core/blocks/Table';
import MjmlBlock from '@core/components/MjmlBlock';

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
