
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { IPage } from '@/components/core/blocks/basic/Page';
  import MjmlBlock from '@/components/core/MjmlBlock';

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
  