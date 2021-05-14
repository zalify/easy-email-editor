import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type ISpacer = IBlockData<{
  'container-background-color'?: string;
  height?: string;
  padding?: string;
}>;

export const Spacer: IBlock<ISpacer> = {
  name: 'Spacer',
  type: BasicType.SPACER,
  Panel,
  createInstance,
  validParentType: [BasicType.COLUMN],
};
