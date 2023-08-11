import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  AdvancedType,
  mergeBlock,
} from 'easy-email-core';

import { CustomBlocksType } from '../../constants';
import React from 'react';

const { BasicBlock } = components;

export type ITopBar6 = IBlockData<
  {
    'background-color': string;
  }
>;


export const TopBar6 = createCustomBlock<ITopBar6>({
  name: 'TopBar 6',
  type: CustomBlocksType.TOPBAR_6,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: payload => {
    const defaultData: ITopBar6 = {
      type: CustomBlocksType.TOPBAR_6,
      data: {
        value: {
        },
      },
      attributes: {
        'background-color': 'yellow',

      },
      children: [
        {
          type: BasicType.COLUMN,
          children: [
            {
              type: BasicType.IMAGE,
              children: [

              ],
              data: { value: {} },
              attributes: {
                src: 'https://plus.unsplash.com/premium_photo-1668064108355-ac4e7a7d089e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=401&q=80 ',
                width: '40px',
                height: '40px',
                'border-radius': '40px',
                align: 'center',
                padding: '0px'
              }
            },
            {
              type: BasicType.NAVBAR,
              children: [],
              data: {
                value: {
                  links: [
                    {
                      href: '/gettings-started-onboard',
                      content: 'Home',
                      color: '#1890ff',
                      'font-size': '13px',
                      target: '_blank',
                      padding: '10px 10px 0px 0px',
                      'line-height':'13px'
                    },
                    {
                      href: '/try-it-live',
                      content: 'About',
                      color: '#1890ff',
                      'font-size': '13px',
                      target: '_blank',
                      padding: '10px 10px 0px 0px',
                      'line-height':'13px'
                    },
                    {
                      href: '/try-it-live',
                      content: 'Privacy',
                      color: '#1890ff',
                      'font-size': '13px',
                      target: '_blank',
                      padding: '10px 10px 0px 0px',
                      'line-height':'13px'
                    },
                  ]
                }
              },
              attributes: {
                align:'center'
              },
            }
          ],
          data: { value: {} },
          attributes: {}
        }
      ],
    };
    return mergeBlock(defaultData, payload);
  },
  render: (params: any) => {
    const { data, idx, mode, context, dataSource } = params;

    return (
      <BasicBlock tag='mj-section' params={params}></BasicBlock>
    );
  },
});
