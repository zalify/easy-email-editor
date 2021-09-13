import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IRaw } from '@/components/core/blocks/basic/Raw';
import MjmlBlock from '@/components/core/MjmlBlock';

export type RawProps = RecursivePartial<IRaw['data']> &
  RecursivePartial<IRaw['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Raw(props: RawProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.RAW}
    >
      {props.children}
    </MjmlBlock>
  );
}
