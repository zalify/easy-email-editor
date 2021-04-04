import { CustomType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ILayout } from '.';
export const createInstance: CreateInstance<ILayout> = (payload) => {
  const defaultData: ILayout = {
    type: CustomType.LAYOUT,
    data: {
      value: {

      },
    },
    attribute: {

    },
    children: [],
  };
  return merge(defaultData, payload);
};
