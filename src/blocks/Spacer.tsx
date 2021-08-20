
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { ISpacer } from '@/components/core/blocks/basic/Spacer';
  import MjmlBlock from '@/components/core/MjmlBlock';

  export type SpacerProps = RecursivePartial<ISpacer['data']> &
  RecursivePartial<ISpacer['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function Spacer(props: SpacerProps) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.SPACER}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  