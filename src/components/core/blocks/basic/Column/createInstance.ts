import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IColumn } from '.';
export const createInstance: CreateInstance<IColumn> = (payload) => {
  const defaultData: IColumn = {
    type: BasicType.COLUMN,
    data: {
      value: {},
    },
    attributes: {
      padding: '0px 0px 0px 0px',
      border: 'none',
      'vertical-align': 'top',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
