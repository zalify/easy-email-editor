import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { ICarousel } from '@core/blocks/Carousel';
import MjmlBlock from '@core/components/MjmlBlock';

export type CarouselProps = RecursivePartial<ICarousel['data']> &
  RecursivePartial<ICarousel['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Carousel(props: CarouselProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.CAROUSEL}
    >
      {props.children}
    </MjmlBlock>
  );
}
