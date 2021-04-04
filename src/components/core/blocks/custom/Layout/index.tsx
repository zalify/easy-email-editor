import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType, CustomType } from '@/constants';

export type ILayout = IBlockData<
  {

  },
  {}
>;

export const Layout = {
  name: 'Layout',
  type: CustomType.LAYOUT,
  Panel,
  createInstance,
  validChildrenType: [BasicType.SECTION],
};
