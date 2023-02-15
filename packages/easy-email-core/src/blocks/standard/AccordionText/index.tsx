import React from 'react';
import { IBlock, IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export type IAccordionText = IBlockData<
  {
    color?: string;
    'background-color'?: string;
    'font-size'?: string;
    'font-family'?: string;
    padding?: string;
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
  },
  {}
>;

export const AccordionText: IBlock = createBlock({
  get name() {
    return t('Accordion text');
  },
  type: BasicType.ACCORDION_TEXT,
  create: (payload) => {
    const defaultData: IAccordionText = {
      type: BasicType.ACCORDION_TEXT,
      data: {
        value: {
          content:
            'Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way',
        },
      },
      attributes: {
        'font-size': '13px',
        padding: '16px 16px 16px 16px',
        'line-height': '1',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.ACCORDION],
  render(params) {
    return (
      <BasicBlock params={params} tag='mj-accordion-text'>
        {params.data.data.value.content}
      </BasicBlock>
    );
  },
});
