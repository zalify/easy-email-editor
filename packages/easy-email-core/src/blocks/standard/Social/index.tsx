import { IBlock, IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@core/utils/createBlock';
import { getImg } from '@core/utils/getImg';
import { mergeBlock } from '@core/utils/mergeBlock';

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
  create: (payload) => {
    const defaultData: ISocial = {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              target: '_blank',
              src: getImg('IMAGE_02'),
              content: 'Facebook',
            },
            {
              href: '#',
              target: '_blank',
              src: getImg('IMAGE_03'),
              content: 'Google',
            },
            {
              href: '',
              target: '_blank',
              src: getImg('IMAGE_04'),
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
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
});
