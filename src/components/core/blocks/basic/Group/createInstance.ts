import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IGroup } from '.';
export const createInstance: CreateInstance<IGroup> = (payload) => {
  const defaultData: IGroup = {
    type: BasicType.GROUP,
    data: {
      value: {},
    },
    attributes: {
      'vertical-align': 'top',
      direction: 'ltr',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
