import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type ITable = IBlockData<{}, { content: string }>;

export const Table: IBlock<ITable> = {
  name: 'Table',
  type: BasicType.TABLE,
  Panel,
  createInstance,
  validParentType: [BasicType.COLUMN],
};
