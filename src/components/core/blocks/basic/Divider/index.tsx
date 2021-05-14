import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
export type IDivider = IBlockData<
  {
    'border-color'?: string;
    'border-style'?: string;
    'border-width'?: string;
    'container-background-color'?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    padding?: string;
  },
  {}
>;

export const Divider: IBlock<IDivider> = {
  name: 'Divider',
  type: BasicType.DIVIDER,
  Panel,
  createInstance,
  validParentType: [BasicType.COLUMN],
};
