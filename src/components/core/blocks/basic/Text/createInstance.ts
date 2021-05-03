import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IText } from '.';
export const createInstance: CreateInstance<IText> = (payload) => {
  const defaultData: IText = {
    type: BasicType.TEXT,
    data: {
      value: {
        content: 'Make it easy for everyone to compose emails!',
      },
    },
    attributes: {
      'font-size': '13px',
      padding: '10px 25px 10px 25px',
      'line-height': 1,
      align: 'left',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
