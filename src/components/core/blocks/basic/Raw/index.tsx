import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IRaw = IBlockData<{}>;

export const Raw: IBlock<IRaw> = {
  name: 'Raw',
  type: BasicType.RAW,
  Panel,
  createInstance,
  validParentType: [BasicType.PAGE],
};
