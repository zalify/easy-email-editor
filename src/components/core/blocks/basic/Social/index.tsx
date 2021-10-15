import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';
import { IMAGE_LIST } from '@/assets/image';
export type ISocial = IBlockData<
  {
    align?: string;
    color?: string;
    'container-background-color'?: string;
    'border-radius'?: string;
    'icon-height'?: string;
    'icon-size'?: string;
    mode?: 'vertical' | 'horizontal';
    'icon-padding': string;
    'text-padding': string;
    'text-decoration'?: string;
    padding?: string;
    'inner-padding'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: CSSProperties['fontWeight'];
    'line-height'?: string | number;
  },
  {
    elements: Array<{
      content: string;
      src: string;
      align?: string;
      alt?: string;
      'background-color'?: string;
      'border-radius'?: string;
      color?: string;
      'font-family'?: string;
      'font-size'?: string;
      'font-style'?: string;
      'font-weight'?: string;
      href?: string;
      'icon-height'?: string;
      'icon-size'?: string;
      'line-height'?: string;
      name?: string;
      padding?: string;
      'icon-padding'?: string;
      'text-padding'?: string;
      target?: string;
      title?: string;
      'text-decoration'?: string;
      'vertical-align'?: string;
    }>;
  }
>;

export const Social: IBlock<ISocial> = createBlock({
  name: 'Social',
  type: BasicType.SOCIAL,
  Panel,
  create: (payload) => {
    const defaultData: ISocial = {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_02,
              content: 'Facebook',
            },
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_03,
              content: 'Google',
            },
            {
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_04,
              content: 'Twitter',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        color: '#333333',
        mode: 'horizontal',
        'font-size': '13px',
        'font-weight': 'normal',
        'border-radius': '3px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '4px 4px 4px 4px',
        'line-height': '22px',
        'text-padding': '4px 4px 4px 0px',
        'icon-padding': '0px',
        'icon-size': '20px',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
});
