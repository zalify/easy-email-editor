
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { ICarousel } from '@/components/core/blocks/basic/Carousel';
  import MjmlBlock from '@/components/core/MjmlBlock';

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
  