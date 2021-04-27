import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ISocial } from '.';

export const createInstance: CreateInstance<ISocial> = (payload) => {
  const defaultData: ISocial = {
    type: BasicType.SOCIAL,
    data: {
      value: {
        elements: [
          {
            'font-size': '13px',
            href: '',
            'icon-size': '20px',
            'line-height': '22px',
            'text-padding': '4px 4px 4px 0',
            target: '_blank',
            'vertical-align': 'middle',
            'text-decoration': 'none',
            color: '#333333',
            src: 'https://assets.maocanhua.cn/93013b18-062d-48d7-ae00-4a5f0a9ac988.png',
            content: 'Facebook',
          },
          {
            'font-size': '13px',
            href: '',
            'icon-size': '20px',
            'line-height': '22px',
            'text-padding': '4px 4px 4px 0',
            target: '_blank',
            'vertical-align': 'middle',
            'text-decoration': 'none',
            color: '#333333',
            src: 'https://assets.maocanhua.cn/a81ddd4b-3a12-47be-91f3-28d71eced397.png',
            content: 'Google',
          },
          {
            'font-size': '13px',
            href: '',
            'icon-size': '20px',
            'line-height': '22px',
            'text-padding': '4px 4px 4px 0',
            target: '_blank',
            'vertical-align': 'middle',
            'text-decoration': 'none',
            color: '#333333',
            src: 'https://assets.maocanhua.cn/0a411326-17c5-4814-ad3a-6927266f097e.png',
            content: 'Twitter',
          },
        ],
      },
    },
    attributes: {
      align: 'center',
      color: '#333333',
      mode: 'horizontal',
      'font-size': '13px',
      'font-weight': 'normal',
      'border-radius': '3px',
      padding: '10px 25px 10px 25px',
      'inner-padding': '4px 4px 4px 4px',
      'line-height': '22px',
      'text-padding': '4px 4px 4px 0px',
      'icon-padding': '0px',
      'icon-size': '20px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
