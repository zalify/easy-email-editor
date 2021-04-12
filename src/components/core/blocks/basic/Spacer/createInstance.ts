import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ISpacer } from '.';

export const createInstance: CreateInstance<ISpacer> = (payload) => {
  const defaultData: ISpacer = {
    type: BasicType.SPACER,
    data: {
      value: {},
    },
    attributes: {
      height: '20px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
