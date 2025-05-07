import React from 'react';
import { IBlock, IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { mergeBlock } from '@core/utils/mergeBlock';
import { t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export type INavbar = IBlockData<
  {
    align?: string;
    hamburger?: string;
    'ico-align'?: string;
    'ico-color'?: string;
    'ico-font-size'?: string;
    'ico-line-height'?: string;
    'ico-padding'?: string;
    'ico-text-decoration'?: string;
    'ico-text-transform'?: string;
  },
  {
    links: Array<{
      content: string;
      color?: string;
      href?: string;
      'font-family'?: string;
      'font-size'?: string;
      'font-style'?: string;
      'font-weight'?: string;
      'line-height'?: string;
      'text-decoration'?: string;
      target?: string;
      padding?: string;
    }>;
  }
>;

export const Navbar: IBlock<INavbar> = createBlock({
  get name() {
    return t('Navbar');
  },
  type: BasicType.NAVBAR,
  create: (payload) => {
    const defaultData: INavbar = {
      type: BasicType.NAVBAR,
      data: {
        value: {
          links: [
            {
              href: '/gettings-started-onboard',
              content: 'Getting started',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px',
            },
            {
              href: '/try-it-live',
              content: 'Try it live',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px',
            },
            {
              href: '/templates',
              content: 'Templates',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px',
            },
            {
              href: '/components',
              content: 'Components',
              color: '#1890ff',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
      },
      children: [],
    };
    return mergeBlock(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],

  render(params) {
    const { data } = params;
    const links = (data ).data.value.links
      .map((link, index) => {
        const linkAttributeStr = Object.keys(link)
          .filter((key) => key !== 'content' && link[key as keyof typeof link] !== '') // filter att=""
          .map((key) => `${key}="${link[key as keyof typeof link]}"`)
          .join(' ');
        return `
          <mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>
          `;
      })
      .join('\n');
    return <BasicBlock params={params} tag="mj-navbar">{links}</BasicBlock>;

  },
});
