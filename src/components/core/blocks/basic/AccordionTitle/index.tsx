import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';

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
  name: 'Accordion title',
  type: BasicType.ACCORDION_TITLE,
  Panel,
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
});
