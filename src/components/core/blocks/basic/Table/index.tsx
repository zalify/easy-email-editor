import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type ITable = IBlockData<
  {

  },
  { content: string; }
>;

export const Table = {
  name: 'Table',
  type: BasicType.TABLE,
  Panel,
  createInstance,
  validChildrenType: [],
};
