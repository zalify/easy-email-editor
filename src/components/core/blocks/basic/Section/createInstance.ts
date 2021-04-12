import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ISection } from '.';
export const createInstance: CreateInstance<ISection> = (payload) => {
  const defaultData: ISection = {
    type: BasicType.SECTION,
    data: {
      value: {},
    },
    attributes: {
      padding: '20px 0px 20px 0px',
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'top center',
      border: 'none',
      direction: 'ltr',
      'text-align': 'center',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
