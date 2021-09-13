import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IText } from '@/components/core/blocks/basic/Text';
import MjmlBlock from '@/components/core/MjmlBlock';

export type TextProps = RecursivePartial<IText['data']> &
  RecursivePartial<IText['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Text(props: TextProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.TEXT}
    >
      {props.children}
    </MjmlBlock>
  );
}
