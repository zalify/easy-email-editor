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
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': '#C9CCCF',
      padding: '10px 0px 10px 0px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
