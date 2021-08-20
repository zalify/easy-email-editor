
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { IImage } from '@/components/core/blocks/basic/Image';
  import MjmlBlock from '@/components/core/MjmlBlock';

  export type ImageProps = RecursivePartial<IImage['data']> &
  RecursivePartial<IImage['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function Image(props: ImageProps) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.IMAGE}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  