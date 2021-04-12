import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IDivider } from '.';

export const createInstance: CreateInstance<IDivider> = (payload) => {
  const defaultData: IDivider = {
    type: BasicType.DIVIDER,
    data: {
      value: {},
    },
    attributes: {
      align: 'center',
      'border-width': '4px',
      'border-style': 'solid',
      'border-color': '#000',
      padding: '10px 25px 10px 25px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
