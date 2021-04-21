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
            src: 'https://assets.maocanhua.cn/Fu0stwAh34fpLPJKvAfUUht_zMr7',
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
            src: 'https://assets.maocanhua.cn/FtBnhQQju_LU3-OtYq9_Ueu-G0lb',
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
            src: 'https://assets.maocanhua.cn/FgE5Mq0WpWZP9uXd4BTgyjo0nFNx',
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
