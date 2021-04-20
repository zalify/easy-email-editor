import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ICarousel } from '.';

export const createInstance: CreateInstance<ICarousel> = (payload) => {
  const defaultData: ICarousel = {
    type: BasicType.CAROUSEL,
    data: {
      value: {
        content: 'Button',
      },
    },
    attributes: {
      align: 'center',
      'background-color': '#414141',
      color: '#ffffff',
      'font-size': '13px',
      'font-weight': 'normal',
      'border-radius': '3px',
      padding: '10px 25px 10px 25px',
      'inner-padding': '10px 25px 10px 25px',
      'line-height': '120%',
      target: '_blank',
      'vertical-align': 'middle',
      border: 'none',
      'text-align': 'center',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
