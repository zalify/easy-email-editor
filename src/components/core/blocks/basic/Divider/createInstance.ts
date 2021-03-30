import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IDivider } from '.';

export const createInstance: CreateInstance<IDivider> = (payload) => {
  const defaultData: IDivider = {
    type: BasicType.DEVIDER,
    data: {
      value: {},
    },
    attribute: {
      align: 'center',
      border: '4px solid #000',
      'padding-top': '10px',
      'padding-bottom': '10px',
      'padding-left': '25px',
      'padding-right': '25px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
