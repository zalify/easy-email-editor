
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { IWrapper } from '@/components/core/blocks/basic/Wrapper';
  import MjmlBlock from '@/components/core/MjmlBlock';

  export type WrapperProps = RecursivePartial<IWrapper['data']> &
  RecursivePartial<IWrapper['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function Wrapper(props: WrapperProps) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.WRAPPER}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  