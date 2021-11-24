import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IPage } from '@core/blocks/Page';
import MjmlBlock from '@core/components/MjmlBlock';

export type PageProps = RecursivePartial<IPage['data']> &
  RecursivePartial<IPage['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Page(props: PageProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.PAGE}
    >
      {props.children}
    </MjmlBlock>
  );
}
