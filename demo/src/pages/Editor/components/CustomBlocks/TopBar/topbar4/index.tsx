import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  getPreviewClassName,
  AdvancedType,
  mergeBlock,
} from 'easy-email-core';

import { CustomBlocksType } from '../../constants';
import React from 'react';
import { getContentEditableClassName } from 'easy-email-editor';
import { BlockRenderer } from '../../../../../../../../packages/easy-email-core/src/components';
// import { BasicBlock } from '../../../../../../../packages/easy-email-core/src/components';

const { Column, Section, Wrapper, Text, Button, Image, Group, BasicBlock } = components;

export type ITopBar4 = IBlockData<
  {
    'background-color': string;
  }
>;

export const TopBar4 = createCustomBlock<ITopBar4>({
  name: 'TopBar 4',
  type: CustomBlocksType.TOPBAR_4,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: (payload:any) => {
    const defaultData: ITopBar4 = {
      type: CustomBlocksType.TOPBAR_4,
      data: {
        value: {
        },
      },
      attributes: {
        'background-color': 'yellow',
      },
      children: [
        {
          type: BasicType.GROUP,
          children: [
            {
              type: BasicType.COLUMN,
              children: [
                {
                  type: BasicType.NAVBAR,
                  children: [

                  ],
                  data: {
                    value: {
                      links: [
                        {
                          href: '/gettings-started-onboard',
                          content: 'Home',
                          color: '#1890ff',
                          'font-size': '13px',
                          target: '_blank',
                          padding: '20px 20px 20px 20px',
                          'line-height':'13px'
                        },
                        {
                          href: '/try-it-live',
                          content: 'About',
                          color: '#1890ff',
                          'font-size': '13px',
                          target: '_blank',
                          padding: '20px 20px 20px 0px',
                          'line-height':'13px'
                        },
                        {
                          href: '/templates',
                          content: 'Privacy',
                          color: '#1890ff',
                          'font-size': '13px',
                          target: '_blank',
                          padding: '20px 20px 20px 0px',
                          'line-height':'13px'
                        },
                      ],
                    }
                  },
                  attributes: {
                    align:'left'
                  }
                },
              ],
              data: {
                value: {

                },
              },
              attributes: {
                padding:'0px',
                width:'70%'
              },
            },
            {
              type: BasicType.COLUMN,
              children: [
                {
                  type: BasicType.IMAGE,
                  children: [],
                  data: {
                    value: {}
                  },
                  attributes: {
                    src: 'https://plus.unsplash.com/premium_photo-1668064108355-ac4e7a7d089e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=401&q=80 ',
                    width:'40px',
                    height:'40px',
                    'border-radius':'40px',
                    align:'right'
                  }
                },
              ],
              data: {
                value: {

                },
              },
              attributes: {
                width:'30%'
              },
            }
          ],
          data: {
            value: {
            },
          },
          attributes: {

          },
        },
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
