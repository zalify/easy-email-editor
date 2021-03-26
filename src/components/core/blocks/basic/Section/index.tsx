import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
export type ISection = IBlockData<null>;

export const Section = {
  name: 'Section',
  type: BasicType.Section,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [],
};
