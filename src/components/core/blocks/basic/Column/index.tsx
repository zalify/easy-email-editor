import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';

export type IColumn = IBlockData<{
  'background-color'?: string;
  'border'?: string;
  'border-radius'?: string;
  'inner-border'?: string;
  'inner-border-radius'?: string;
  'padding'?: string;
  'text-align'?: CSSProperties['textAlign'];
  'vertical-align'?: CSSProperties['verticalAlign'];
  'width'?: string;
}, {

}>;

export const Column = {
  name: '列',
  type: BasicType.COLUMN,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [
    BasicType.TEXT,
    BasicType.IMAGE,
    BasicType.BUTTON,
    BasicType.DIVIDER,
  ],
};
