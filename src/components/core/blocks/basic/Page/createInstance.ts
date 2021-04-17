import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IPage } from '.';

export const createInstance: CreateInstance<IPage> = (payload) => {
  const defaultData: IPage = {
    type: BasicType.PAGE,
    data: {
      value: {
        breakpoint: '480px',
      },
    },
    attributes: {
      'background-color': '#FFFFFF',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
