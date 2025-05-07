import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IPage } from '@core/blocks';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

export type PageProps = RecursivePartial<IPage['data']> &
  RecursivePartial<IPage['attributes']> & {
    children?: MjmlBlockProps<IPage>['children'];
  };

export function Page(props: PageProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children', 'value'])}
      value={props.value}
      type={BasicType.PAGE}
    >
      {props.children}
    </MjmlBlock>
  );
}
