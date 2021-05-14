import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';

export type IImage = IBlockData<{
  alt?: string;
  src?: string;
  title?: string;
  href?: string;
  target?: string;
  border?: string;
  height?: string;
  'text-decoration'?: string;
  'text-transform'?: CSSProperties['textTransform'];
  align?: CSSProperties['textAlign'];
  'container-background-color'?: string;
  width?: string;
  padding?: string;
}>;

export const Image: IBlock<IImage> = {
  name: 'Image',
  type: BasicType.IMAGE,
  Panel,
  createInstance,
  validParentType: [BasicType.COLUMN],
};
