import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IHero } from '.';
import { Button } from '../Button';
import { Text } from '../Text';

export const createInstance: CreateInstance<IHero> = (payload) => {
  const defaultData: IHero = {
    type: BasicType.HERO,
    data: {
      value: {

      },
    },
    attributes: {
      'background-color': '#ffffff',
      'background-position': 'center center',
      'mode': 'fluid-height',
      padding: '100px 0px 100px 0px',
      'vertical-align': 'top',
      "background-url": "https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg",
    },
    children: [
      Text.createInstance({
        data: {
          value: {
            content: 'GO TO SPACE'
          },

        },
        attributes: {
          color: '#ffffff',
          align: "center",
          'font-size': "45px",
          'line-height': "45px"
        }
      }),
      Button.createInstance({
        data: {
          value: {
            content: 'ORDER YOUR TICKET NOW'
          }
        },
        attributes: {
          href: '#'
        }
      })
    ],
  };
  return merge(defaultData, payload);
};
