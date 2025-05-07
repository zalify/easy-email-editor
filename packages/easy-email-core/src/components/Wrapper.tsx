import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IWrapper } from '@core/blocks';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

export type WrapperProps = RecursivePartial<IWrapper['data']> &
  RecursivePartial<IWrapper['attributes']> & {
    children?: MjmlBlockProps<IWrapper>['children'];
  };

export function Wrapper(props: WrapperProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children', 'value'])}
      value={props.value}
      type={BasicType.WRAPPER}
    >
      {props.children}
    </MjmlBlock>
  );
}
