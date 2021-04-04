import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';

export type ISpacer = IBlockData<{
  'container-background-color'?: string;
  height?: string;
  'width'?: string;
  'padding'?: string;
  'vertical-align': CSSProperties['verticalAlign'];
}>;

export const Spacer = {
  name: 'Spacer',
  type: BasicType.SPACER,
  Panel,
  createInstance,
  validChildrenType: [],
};
