import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IColumn } from '.';
import { Text } from '../Text';
export const createInstance: CreateInstance<IColumn> = (payload) => {
  const defaultData: IColumn = {
    type: BasicType.COLUMN,
    data: {
      value: {

      },
    },
    attribute: {
      'padding-top': '0px',
      'padding-bottom': '0px',
      'padding-left': '0px',
      'padding-right': '0px',
      border: 'none',
      'vertical-align': 'top'
    },
    children: [
      Text.createInstance({
        data: {
          value: 'Hi here’s your weekly summary for'
        }
      })
    ],
  };
  return merge(defaultData, payload);
};
