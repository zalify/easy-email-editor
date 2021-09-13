import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IButton } from '@/components/core/blocks/basic/Button';
import MjmlBlock from '@/components/core/MjmlBlock';

export type ButtonProps = RecursivePartial<IButton['data']> &
  RecursivePartial<IButton['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Button(props: ButtonProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.BUTTON}
    >
      {props.children}
    </MjmlBlock>
  );
}
