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

export type ITopBar2 = IBlockData<
  {
    'background-color': string;
    'button-color': string;
    'button-text-color': string;
    'product-name-color': string;
    'product-price-color': string;
    'title-color': string;
  },
  {
    title: string;
    buttonText: string;
    quantity: number;
  }
>;


export const TopBar2 = createCustomBlock<ITopBar2>({
  name: 'TopBar 2',
  type: CustomBlocksType.TOPBAR_2,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: (payload: any) => {
    const defaultData: ITopBar2 = {
      type: CustomBlocksType.TOPBAR_2,
      data: {
        value: {
          title: 'You might also like',
          buttonText: 'Buy now',
          quantity: 3,
        },
      },
      attributes: {
        'background-color': '#ffffff',
        'button-text-color': '#ffffff',
        'button-color': '#414141',
        'product-name-color': '#414141',
        'product-price-color': '#414141',
        'title-color': '#222222',
      },
      children: [
        {
          type: BasicType.SECTION,
          children: [
            {
              type:BasicType.COLUMN,
              children:[
                {
                  type: BasicType.TEXT,
                  children: [],
                  data: {
                    value: {
                      content: 'Gluelabs'
                    }
                  },
                  attributes: {
                    'font-weight':'600',
                    'line-height':'30px',
                    'font-size':'20px',
                    padding:'0px 0px 0px 0px',
                    align:'center'
                  }
                },
              ],
              data: {
                value: {}
              },
              attributes: {}
            }
          ],
          data: {
            value: {},
          },
          attributes: {},
        },
        {
          type: BasicType.SECTION,
          children:[
            {
              type: BasicType.GROUP,
              children: [
                {
                  type: BasicType.COLUMN,
                  children: [{
                    type: BasicType.TEXT,
                    children: [],
                    data: {
                      value: {
                        content: 'custom'
                      }
                    },
                    attributes: {
                    'font-weight':'400',
                    'line-height':'20px',
                    'font-size':'16px',
                    padding:'0px 0px 0px 0px',
                    align:'center'
                    },
                  },],
                  data: {
                    value: {

                    },
                  },
                  attributes: {},
                },

                {
                  type: BasicType.COLUMN,
                  children: [{
                    type: BasicType.TEXT,
                    children: [],
                    data: {
                      value: {
                        content: 'hello'
                      },
                    },
                    attributes: {
                      'font-weight':'400',
                    'line-height':'20px',
                    'font-size':'16px',
                    padding:'0px 0px 0px 0px',
                    align:'center'
                    },
                  },],
                  data: {
                    value: {

                    },
                  },
                  attributes: {},
                },

                {
                  type: BasicType.COLUMN,
                  children: [{
                    type: BasicType.TEXT,
                    children: [],
                    data: {
                      value: {
                        content: 'home'
                      },
                    },
                    attributes: {
                      'font-weight':'400',
                    'line-height':'20px',
                    'font-size':'16px',
                    padding:'0px 0px 0px 0px',
                    align:'center'
                    },
                  },],
                  data: {
                    value: {

                    },
                  },
                  attributes: {},
                },

                {
                  type: BasicType.COLUMN,
                  children: [{
                    type: BasicType.TEXT,
                    children: [],
                    data: {
                      value: {
                        content: 'custom block title',
                      },
                    },
                    attributes: {
                      'font-weight':'400',
                    'line-height':'20px',
                    'font-size':'16px',
                    padding:'0px 0px 0px 0px',
                    align:'center'
                    },
                  },],
                  data: {
                    value: {

                    },
                  },
                  attributes: {},
                },

                {
                  type: BasicType.COLUMN,
                  children: [{
                    type: BasicType.TEXT,
                    children: [],
                    data: {
                      value: {
                        content: 'block title',
                      },
                    },
                    attributes: {
                      'font-weight':'400',
                    'line-height':'20px',
                    'font-size':'16px',
                    padding:'0px 0px 0px 0px',
                    align:'center'
                    },
                  },],
                  data: {
                    value: {

                    },
                  },
                  attributes: {},
                },
              ],
              data: {
                value: {
                },
              },
              attributes: {},
            },
          ],
          data:{
            value:{}
          },
          attributes:{}
        }
      ],
    };
    return mergeBlock(defaultData, payload);
  },
  render: (params: any) => {
    const { data, idx, mode, context, dataSource } = params;

    return (
      <BasicBlock tag='mj-wrapper' params={params}></BasicBlock>
    );
  },
});
