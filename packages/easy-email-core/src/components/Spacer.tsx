import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { ISpacer } from '@core/blocks/Spacer';
import MjmlBlock from '@core/components/MjmlBlock';

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
