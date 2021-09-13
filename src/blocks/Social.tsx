import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { ISocial } from '@/components/core/blocks/basic/Social';
import MjmlBlock from '@/components/core/MjmlBlock';

export type SocialProps = RecursivePartial<ISocial['data']> &
  RecursivePartial<ISocial['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Social(props: SocialProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.SOCIAL}
    >
      {props.children}
    </MjmlBlock>
  );
}
