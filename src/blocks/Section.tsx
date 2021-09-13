import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { ISection } from '@/components/core/blocks/basic/Section';
import MjmlBlock from '@/components/core/MjmlBlock';

export type SectionProps = RecursivePartial<ISection['data']> &
  RecursivePartial<ISection['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Section(props: SectionProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.SECTION}
    >
      {props.children}
    </MjmlBlock>
  );
}
