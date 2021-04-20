import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
export type IAccordionTitle = IBlockData<
  {
    'color'?: string;
    'background-color'?: string;
    'font-size'?: string;
    'font-family'?: string;
    'padding'?: string;
  },
  {}
>;

export const AccordionTitle = {
  name: 'Accordion title',
  type: BasicType.ACCORDION_TITLE,
  Panel,
  createInstance,
  validChildrenType: [],
};
