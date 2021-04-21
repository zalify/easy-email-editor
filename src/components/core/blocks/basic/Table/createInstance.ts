import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ITable } from '.';

export const createInstance: CreateInstance<ITable> = (payload) => {
  const defaultData: ITable = {
    type: BasicType.TABLE,
    data: {
      value: {
        content: '',
      },
    },
    attributes: {

    },
    children: [],
  };
  return merge(defaultData, payload);
};
