import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IImage } from '.';

export const createInstance: CreateInstance<IImage> = (payload) => {
  const defaultData: IImage = {
    type: BasicType.IMAGE,
    data: {
      value: {},
    },
    attributes: {
      align: 'center',
      height: 'auto',
      padding: '10px 25px',
      src: 'https://assets.maocanhua.cn/ba2b36a1-6c17-4035-af57-7e6fbca05920.png',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
