import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
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

export const AccordionText: IBlock = {
  name: 'Accordion text',
  type: BasicType.ACCORDION_TEXT,
  Panel,
  createInstance,
  validParentType: [BasicType.ACCORDION],
};
