import { Panel } from './Panel';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';
export type IText = IBlockData<
  {
    color?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: CSSProperties['fontWeight'];
    'line-height'?: string | number;
    'letter-spacing'?: string;
    height?: string;
    'text-decoration'?: string;
    'text-transform'?: CSSProperties['textTransform'];
    align?: CSSProperties['textAlign'];
    'container-background-color'?: string;
    width?: string;
    padding?: string;
  },
  {
    content: string;
  }
>;

export const Text = createBlock<IText>({
  name: 'Text',
  type: BasicType.TEXT,
  Panel,
  create: (payload) => {
    const defaultData: IText = {
      type: BasicType.TEXT,
      data: {
        value: {
          content: 'Make it easy for everyone to compose emails!',
        },
      },
      attributes: {
        padding: '10px 25px 10px 25px',
        align: 'left',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
});
