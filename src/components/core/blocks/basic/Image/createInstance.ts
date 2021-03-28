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
      'padding-top': '10px',
      'padding-bottom': '10px',
      'padding-left': '25px',
      'padding-right': '25px',
      src: 'https://documentation.mjml.io/images/logo.png',
      target: '',
      width: '100%'
    },
    children: [],
  };
  return merge(defaultData, payload);
};
