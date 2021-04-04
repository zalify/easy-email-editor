import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
export type IWrapper = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'full-width'?: string;
    direction?: 'ltr' | 'rtl';
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
  },
  {}
>;

export const Wrapper = {
  name: 'Wrapper',
  type: BasicType.WRAPPER,
  Panel,
  createInstance,
  validChildrenType: [BasicType.SECTION],
};
