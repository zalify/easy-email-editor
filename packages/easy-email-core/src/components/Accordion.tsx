import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IAccordion } from '@core/blocks/Accordion';
import MjmlBlock from '@core/components/MjmlBlock';

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
