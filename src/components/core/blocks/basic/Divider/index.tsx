import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
export type IDivider = IBlockData<
  {
    'border-color'?: string;
    'border-style'?: string;
    'border-width'?: string;
    'container-background-color'?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    'padding'?: string;
  },
  {}
>;

export const Divider = {
  name: 'divider',
  type: BasicType.DIVIDER,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [],
};
