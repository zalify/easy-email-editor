import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';

export type IColumn = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'inner-border'?: string;
    'inner-border-radius'?: string;
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
    'vertical-align'?: CSSProperties['verticalAlign'];
    width?: string;
  },
  {}
>;

export const Column: IBlock<IColumn> = {
  name: 'Column',
  type: BasicType.COLUMN,
  Panel,
  createInstance,
  validParentType: [BasicType.SECTION, BasicType.GROUP],
};
