import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IButton } from '.';

export const createInstance: CreateInstance<IButton> = (payload) => {
  const defaultData: IButton = {
    type: BasicType.BUTTON,
    data: {
      value: {
        content: 'Button',
      },
    },
    attribute: {
      align: 'center',
      'background-color': '	#414141',
      color: '#ffffff',
      'font-size': '13px',
      'font-weight': 'normal',
      'border-radius': '3px',
      'padding-top': '10px',
      'padding-bottom': '10px',
      'padding-left': '25px',
      'padding-right': '25px',
      'inner-padding-top': '10px',
      'inner-padding-bottom': '10px',
      'inner-padding-left': '25px',
      'inner-padding-right': '25px',
      'line-height': '120%',
      'target': '_blank',
      'vertical-align': 'middle',
      border: 'none',
      'text-align': 'center'
    },
    children: [],
  };
  return merge(defaultData, payload);
};
