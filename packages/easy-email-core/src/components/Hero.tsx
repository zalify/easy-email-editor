import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IHero } from '@core/blocks/Hero';
import MjmlBlock from '@core/components/MjmlBlock';

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
