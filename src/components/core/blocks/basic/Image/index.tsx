import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';
import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';

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

export const Image: IBlock<IImage> = createBlock({
  name: 'Image',
  type: BasicType.IMAGE,
  Panel,
  create: (payload) => {
    const defaultData: IImage = {
      type: BasicType.IMAGE,
      data: {
        value: {},
      },
      attributes: {
        align: 'center',
        height: 'auto',
        padding: '10px 25px 10px 25px',
        src: 'https://assets.maocanhua.cn/0e7331f3-30b6-49ab-a0ab-fffd23383685-image.png',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
});
