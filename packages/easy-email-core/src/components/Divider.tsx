import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IDivider } from '@core/blocks/Divider';
import MjmlBlock from '@core/components/MjmlBlock';

export type DividerProps = RecursivePartial<IDivider['data']> &
  RecursivePartial<IDivider['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Divider(props: DividerProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.DIVIDER}
    >
      {props.children}
    </MjmlBlock>
  );
}
