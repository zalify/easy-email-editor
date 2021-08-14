import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IPage } from '.';
import { Wrapper } from '../Wrapper';

export const createInstance: CreateInstance<IPage> = (payload) => {
  const defaultData: IPage = {
    type: BasicType.PAGE,
    data: {
      value: {
        breakpoint: '480px',
        'font-family': 'lucida Grande,Verdana,Microsoft YaHei',
        'text-color': '#000000',
        headAttributes: '',
        fonts: [],
        responsive: true
      },
    },
    attributes: {
      'background-color': '#efeeea',
      width: '600px'
    },
    children: [Wrapper.createInstance()],
  };
  return merge(defaultData, payload);
};
