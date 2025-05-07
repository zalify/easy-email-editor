import React from 'react';
import { IBlock, IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export type IAccordionTitle = IBlockData<
  {
    color?: string;
    'background-color'?: string;
    'font-size'?: string;
    'font-family'?: string;
    padding?: string;
  },
  {}
>;

export const AccordionTitle: IBlock = createBlock({
  get name() {
    return t('Accordion title');
  },
  type: BasicType.ACCORDION_TITLE,
  create: (payload) => {
    const defaultData: IAccordionTitle = {
      type: BasicType.ACCORDION_TITLE,
      data: {
        value: {
          content: 'Why use an accordion?',
        },
      },
      attributes: {
        'font-size': '13px',
        padding: '16px 16px 16px 16px',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return (
      <BasicBlock params={params} tag='mj-accordion-title'>
        {params.data.data.value.content}
      </BasicBlock>
    );
  },
});
