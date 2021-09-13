import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IAccordion } from '@/components/core/blocks/basic/Accordion';
import MjmlBlock from '@/components/core/MjmlBlock';

export type AccordionProps = RecursivePartial<IAccordion['data']> &
  RecursivePartial<IAccordion['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Accordion(props: AccordionProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.ACCORDION}
    >
      {props.children}
    </MjmlBlock>
  );
}
