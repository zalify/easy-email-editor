import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IWrapper } from '.';
export const createInstance: CreateInstance<IWrapper> = (payload) => {
  const defaultData: IWrapper = {
    type: BasicType.WRAPPER,
    data: {
      value: {},
    },
    attributes: {
      padding: '20px 0px 20px 0px',
      border: 'none',
      direction: 'ltr',
      'text-align': 'center',
      'background-color': '#ffffff',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
