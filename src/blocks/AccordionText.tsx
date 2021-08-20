
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { IAccordionText } from '@/components/core/blocks/basic/AccordionText';
  import MjmlBlock from '@/components/core/MjmlBlock';

  export type AccordionTextProps = RecursivePartial<IAccordionText['data']> &
  RecursivePartial<IAccordionText['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function AccordionText(props: AccordionTextProps) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.ACCORDION_TEXT}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  