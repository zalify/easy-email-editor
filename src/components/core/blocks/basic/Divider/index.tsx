import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
export type IDivider = IBlockData<
  {
    border?: string;
    'container-background-color'?: string;
    width?: string;
    align?: string;
    'padding-top'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
  },
  {}
>;

export const Divider = {
  name: 'divider',
  type: BasicType.DEVIDER,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [],
};
