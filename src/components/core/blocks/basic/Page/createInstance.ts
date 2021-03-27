import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IPage } from '.';

export const createInstance: CreateInstance<IPage> = (payload) => {
  const defaultData: IPage = {
    type: BasicType.PAGE,
    data: {
      value: {},
    },
    attribute: {
      width: '100%',
      height: 'auto',
      minHeight: '667px',
      backgroundColor: '#fff',
      position: 'relative',
      fontSize: '14px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
