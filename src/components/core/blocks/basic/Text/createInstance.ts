import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IText } from '.';
export const createInstance: CreateInstance<IText> = (payload) => {
  const defaultData: IText = {
    type: BasicType.TEXT,
    data: {
      value: {

      },
    },
    attribute: {
      color: '#000000',
      'font-size': '13px',
      'padding-top': '10px',
      'padding-bottom': '10px',
      'padding-left': '25px',
      'padding-right': '25px',
      'line-height': 1,
      'letter-spacing': 'none',
      align: 'left'
    },
    children: [],
  };
  return merge(defaultData, payload);
};
