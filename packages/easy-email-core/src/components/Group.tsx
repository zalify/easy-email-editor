import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IGroup } from '@core/blocks/Group';
import MjmlBlock from '@core/components/MjmlBlock';

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
