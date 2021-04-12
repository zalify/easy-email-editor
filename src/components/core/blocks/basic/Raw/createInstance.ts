import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IRaw } from '.';

export const createInstance: CreateInstance<IRaw> = (payload) => {
  const defaultData: IRaw = {
    type: BasicType.RAW,
    data: {
      value: {},
    },
    attributes: {},
    children: [],
  };
  return merge(defaultData, payload);
};
