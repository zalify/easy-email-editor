
  import { omit } from 'lodash';
  import { BasicType } from '@/constants';
  import { RecursivePartial } from '@/typings';
  import React from 'react';
  import { IAccordionTitle } from '@/components/core/blocks/basic/AccordionTitle';
  import MjmlBlock from '@/components/core/MjmlBlock';

  export type AccordionTitleProps = RecursivePartial<IAccordionTitle['data']> &
  RecursivePartial<IAccordionTitle['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

  export function AccordionTitle(props: AccordionTitleProps) {
    return (
      <MjmlBlock
        attributes={omit(props, ['data', 'children'])}
        value={props.value}
        type={BasicType.ACCORDION_TITLE}
      >
        {props.children}
      </MjmlBlock>
    );
  }
  