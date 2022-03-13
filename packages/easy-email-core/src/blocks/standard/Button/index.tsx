import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
export type IButton = IBlockData<
  {
    align?: string;
    color?: string;
    'background-color'?: string;
    'container-background-color'?: string;
    border?: string;
    'border-radius'?: string;
    href?: string;
    rel?: string;
    target?: string;
    title?: string;
    padding?: string;
    'inner-padding'?: string;
    'text-align'?: CSSProperties['textAlign'];
    'vertical-align'?: 'middle' | 'top' | 'bottom';
    width?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: CSSProperties['fontWeight'];
    'line-height'?: string | number;
    'letter-spacing'?: string;
    height?: string;
    'text-decoration'?: string;
    'text-transform'?: CSSProperties['textTransform'];
  },
  { content: string }
>;

export const Button = createBlock<IButton>({
  name: 'Button',
  type: BasicType.BUTTON,
  create: (payload) => {
    const defaultData: IButton = {
      type: BasicType.BUTTON,
      data: {
        value: {
          content: 'Button',
        },
      },
      attributes: {
        align: 'center',
        'background-color': '#414141',
        color: '#ffffff',
        'font-weight': 'normal',
        'border-radius': '3px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '10px 25px 10px 25px',
        'line-height': '120%',
        target: '_blank',
        'vertical-align': 'middle',
        border: 'none',
        'text-align': 'center',
        href: '#',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
});
