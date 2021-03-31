import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IPage = IBlockData<{
  'background-color'?: string;
}, {
  breakpoint?: string;
}>;

export const Page: IBlock<IPage> = {
  name: 'Page',
  type: BasicType.PAGE,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [
    BasicType.SECTION,
    BasicType.WRAPPER,

  ],
};
