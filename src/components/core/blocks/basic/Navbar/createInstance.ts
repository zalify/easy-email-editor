import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { INavbar } from '.';

export const createInstance: CreateInstance<INavbar> = (payload) => {
  const defaultData: INavbar = {
    type: BasicType.NAVBAR,
    data: {
      value: {
        links: [
          {
            href: '/gettings-started-onboard',
            content: 'Getting started',
            color: '#1890ff',
            "font-size": "13px",
            target: "_blank",
          },
          {
            href: '/try-it-live',
            content: 'Try it live',
            color: '#1890ff',
            "font-size": "13px",
            target: "_blank",
          },
          {
            href: '/templates',
            content: 'Templates',
            color: '#1890ff',
            "font-size": "13px",
            target: "_blank",
          },
          {
            href: '/components',
            content: 'Components',
            color: '#1890ff',
            "font-size": "13px",
            target: "_blank",
          },
        ],
      },
    },
    attributes: {
      hamburger: 'hamburger',
      align: 'center',
      'ico-align': 'center',
      'ico-color': '#1890ff',
      'ico-font-size': '30px',
      'ico-line-height': '30px',
      'ico-padding': '10px 10px 10px 10px',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
