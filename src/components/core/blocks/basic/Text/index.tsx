import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
export type IText = IBlockData<{}, {
  'color'?: string;
  'font-family'?: string;
  'font-size'?: string;
  'font-style'?: string;
  'font-weight'?: CSSProperties['fontWeight'];
  'line-height'?: string | number;
  'letter-spacing'?: string;
  'height'?: string;
  'text-decoration'?: string;
  'text-transform'?: CSSProperties['textTransform'];
  'align'?: CSSProperties['textAlign'];
  'container-background-color'?: string;
  'width'?: string;
  'padding-top'?: string;
  'padding-bottom'?: string;
  'padding-left'?: string;
  'padding-right'?: string;
}>;

export const Text = {
  name: '文本',
  type: BasicType.TEXT,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [],
};
