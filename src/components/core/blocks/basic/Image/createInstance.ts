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
      src: 'https://documentation.mjml.io/images/logo.png',
      target: '',
      width: '100%'
    },
    children: [],
  };
  return merge(defaultData, payload);
};
