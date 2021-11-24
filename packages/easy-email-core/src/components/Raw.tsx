import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IRaw } from '@core/blocks/Raw';
import MjmlBlock from '@core/components/MjmlBlock';

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
