import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { ITemplate } from '@core/blocks/Template';
import MjmlBlock from '@core/components/MjmlBlock';

export type TemplateProps = RecursivePartial<ITemplate['data']> &
  RecursivePartial<ITemplate['attributes']> & {
    children: string;
    idx: string;
  };

export function Template(props: TemplateProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      type={BasicType.TEMPLATE}
      value={props.value}
    >
      {props.children}
    </MjmlBlock>
  );
}
