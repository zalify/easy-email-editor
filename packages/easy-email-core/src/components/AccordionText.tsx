
  import { omit } from 'lodash';
  import { BasicType } from '@core/constants';
  import { RecursivePartial } from '@core/typings';
  import React from 'react';
  import { IAccordionText } from '@core/blocks/AccordionText';
  import MjmlBlock, { MjmlBlockProps } from '@core/components/MjmlBlock';

  export type AccordionTextProps = RecursivePartial<IAccordionText['data']> &
  RecursivePartial<IAccordionText['attributes']> & {
    children?: MjmlBlockProps<IAccordionText>['children'];
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
  