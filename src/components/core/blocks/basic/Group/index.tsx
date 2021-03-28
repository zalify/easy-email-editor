import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IGroup = IBlockData<{
  'width'?: string;
  'vertical-align'?: 'middle' | 'top' | 'bottom';
  'background-color'?: string;
  'direction'?: 'ltr' | 'rtl';

}>;

export const Group = {
  name: 'Group',
  type: BasicType.GROUP,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [
    BasicType.COLUMN
  ],
};
