import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { IAccordionElement } from '@core/blocks';
import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

export type AccordionElementProps = RecursivePartial<IAccordionElement['data']> &
  RecursivePartial<IAccordionElement['attributes']> & {
    children?: MjmlBlockProps<IAccordionElement>['children'];
  };

export function AccordionElement(props: AccordionElementProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children', 'value'])}
      value={props.value}
      type={BasicType.ACCORDION_ELEMENT}
    >
      {props.children}
    </MjmlBlock>
  );
}
