import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IDivider } from '@/components/core/blocks/basic/Divider';
import MjmlBlock from '@/components/core/MjmlBlock';

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
