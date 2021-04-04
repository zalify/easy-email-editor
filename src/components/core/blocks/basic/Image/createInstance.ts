import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IImage } from '.';

export const createInstance: CreateInstance<IImage> = (payload) => {
  const defaultData: IImage = {
    type: BasicType.IMAGE,
    data: {
      value: {

      },
    },
    attribute: {
      align: 'center',
      height: 'auto',
      'padding': '10px 25px',
      src: 'https://assets.maocanhua.cn/FsEjdcDqV6HYphntqWQC1m1OJCjI',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
