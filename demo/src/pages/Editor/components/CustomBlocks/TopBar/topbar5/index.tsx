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

export type ITopBar5 = IBlockData<
  {
    'background-color': string;
    'background-url': string;
  }
>;


export const TopBar5 = createCustomBlock<ITopBar5>({
  name: 'TopBar 5',
  type: CustomBlocksType.TOPBAR_5,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: payload => {
    const defaultData: ITopBar5 = {
      type: CustomBlocksType.TOPBAR_5,
      data: {
        value: {
          title: 'You might also like',
          buttonText: 'Buy now',
          quantity: 3,
        },
      },
      attributes: {
        'background-color': '#ffffff',
        'background-url':'https://images.unsplash.com/photo-1598124146163-36819847286d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
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
                          padding: '10px 10px 20px 10px',
                          'line-height':'13px'
                        },
                        {
                          href: '/try-it-live',
                          content: 'About',
                          color: '#1890ff',
                          'font-size': '13px',
                          target: '_blank',
                          padding: '10px 0px 20px 0px',
                          'line-height':'13px'
                        },

                      ]
                    }
                  },
                  attributes: {
                    align:'left'
                  },
                },
              ],
              data: {
                value: {

                },
              },
              attributes: {
                width:'40%'
              },
            },
            {
              type:BasicType.COLUMN,
              children:[
                {
                  type: BasicType.IMAGE,
                  children: [],
                  data: {
                    value: {}
                  },
                  attributes: {
                    src: 'https://plus.unsplash.com/premium_photo-1668064108355-ac4e7a7d089e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=401&q=80 ',
                    'width':'40px',
                    height:'40px',
                    'border-radius':'40px',
                    align:'center',
                    padding:'0px'
                  }
                },
              ],
              data:{
                value:{}
              },
              attributes:{
                width:'20%'
              }
            },
            {
              type:BasicType.COLUMN,
              children:[
                {
                  type: BasicType.NAVBAR,
                  children: [],
                  data: {
                    value: {
                      links: [
                        {
                          href: '/gettings-started-onboard',
                          content: 'Privacy',
                          color: '#1890ff',
                          'font-size': '13px',
                          target: '_blank',
                          padding: '10px 10px 20px 0px',
                          'line-height':'13px'
                        },
                        {
                          href: '/try-it-live',
                          content: 'Service',
                          color: '#1890ff',
                          'font-size': '13px',
                          target: '_blank',
                          padding: '10px 10px 20px 0px',
                          'line-height':'13px'
                        },
                      ]
                    }
                  },
                  attributes: {
                    align:'right'
                  },
                }
              ],
              data:{
                value:{}
              },
              attributes:{
                width:'40%'
              }
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
