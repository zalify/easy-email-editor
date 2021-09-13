import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { IAccordionElement } from '@/components/core/blocks/basic/AccordionElement';
import MjmlBlock from '@/components/core/MjmlBlock';

export type AccordionElementProps = RecursivePartial<
  IAccordionElement['data']
> &
  RecursivePartial<IAccordionElement['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function AccordionElement(props: AccordionElementProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.ACCORDION_ELEMENT}
    >
      {props.children}
    </MjmlBlock>
  );
}
