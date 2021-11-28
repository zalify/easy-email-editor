import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { ISection } from '@core/blocks/Section';
import MjmlBlock from '@core/components/MjmlBlock';

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
