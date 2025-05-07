import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IAccordion } from '@core/blocks';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

export type AccordionProps = RecursivePartial<IAccordion['data']> &
  RecursivePartial<IAccordion['attributes']> & {
    children?: MjmlBlockProps<IAccordion>['children'];
  };

export function Accordion(props: AccordionProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children', 'value'])}
      value={props.value}
      type={BasicType.ACCORDION}
    >
      {props.children}
    </MjmlBlock>
  );
}
