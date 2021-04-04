import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type ISpacer = IBlockData<{
  'container-background-color'?: string;
  height?: string;
  'padding'?: string;
}>;

export const Spacer = {
  name: 'Spacer',
  type: BasicType.SPACER,
  Panel,
  createInstance,
  validChildrenType: [],
};
