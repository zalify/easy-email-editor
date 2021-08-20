
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { IGroup } from '@/components/core/blocks/basic/Group';
  import MjmlBlock from '@/components/core/MjmlBlock';

  export type GroupProps = RecursivePartial<IGroup['data']> &
  RecursivePartial<IGroup['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function Group(props: GroupProps) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.GROUP}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  