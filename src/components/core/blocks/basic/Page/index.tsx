import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType, CustomType } from '@/constants';

export type IPage = IBlockData<{
  'background-color'?: string;
}, {
  breakpoint?: string;
}>;

export const Page: IBlock<IPage> = {
  name: 'Page',
  type: BasicType.PAGE,
  Panel,
  createInstance,
  validChildrenType: [
    BasicType.SECTION,
    BasicType.WRAPPER,
    CustomType.LAYOUT
  ],
};
