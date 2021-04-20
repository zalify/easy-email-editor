import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IAccordion } from '.';

export const createInstance: CreateInstance<IAccordion> = (payload) => {
  const defaultData: IAccordion = {
    type: BasicType.ACCORDION,
    data: {
      value: {},
    },
    attributes: {
      'icon-align': 'middle',
      'icon-height': '32px',
      'icon-width': '32px',

      'icon-position': 'right',
      'icon-unwrapped-url': 'https://i.imgur.com/w4uTygT.png',
      'icon-wrapped-url': 'https://i.imgur.com/bIXv1bk.png',
      padding: '10px 25px 10px 25px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
