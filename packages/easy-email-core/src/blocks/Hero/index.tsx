import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { merge } from 'lodash';
import { Button } from '../Button';
import { Text } from '../Text';
import { createBlock } from '@core/utils/createBlock';
export type IHero = IBlockData<
  {
    'background-color'?: string;
    'background-height'?: string;
    'background-position'?: string;
    'background-url'?: string;
    'background-width'?: string;
    'vertical-align'?: string;
    'border-radius'?: string;
    width?: string;
    height?: string;
    mode: 'fluid-height' | 'fixed-height';
    padding?: string;
  },
  {}
>;

export const Hero = createBlock<IHero>({
  name: 'Hero',
  type: BasicType.HERO,
  create: (payload) => {
    const defaultData: IHero = {
      type: BasicType.HERO,
      data: {
        value: {},
      },
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        padding: '100px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url':
          'https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg',
      },
      children: [
        Text.create({
          data: {
            value: {
              content: 'GO TO SPACE',
            },
          },
          attributes: {
            color: '#ffffff',
            align: 'center',
            'font-size': '45px',
            'line-height': '45px',
          },
        }),
        Button.create({
          data: {
            value: {
              content: 'ORDER YOUR TICKET NOW',
            },
          },
          attributes: {
            href: '#',
          },
        }),
      ],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
});
