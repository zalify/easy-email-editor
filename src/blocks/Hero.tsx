import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IHero } from '@/components/core/blocks/basic/Hero';
import MjmlBlock from '@/components/core/MjmlBlock';

export type HeroProps = RecursivePartial<IHero['data']> &
  RecursivePartial<IHero['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Hero(props: HeroProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.HERO}
    >
      {props.children}
    </MjmlBlock>
  );
}
