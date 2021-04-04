import { Panel } from './Panel';
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
  Panel,
  createInstance,
  validChildrenType: [
    BasicType.COLUMN
  ],
};
