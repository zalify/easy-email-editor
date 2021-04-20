import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
export type IAccordionText = IBlockData<
  {
    'color'?: string;
    'background-color'?: string;
    'font-size'?: string;
    'font-family'?: string;
    'padding'?: string;
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
  },
  {}
>;

export const AccordionText = {
  name: 'Accordion text',
  type: BasicType.ACCORDION_TEXT,
  Panel,
  createInstance,
  validChildrenType: [],
};
