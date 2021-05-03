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
      src: 'https://assets.maocanhua.cn/0e7331f3-30b6-49ab-a0ab-fffd23383685-image.png',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
