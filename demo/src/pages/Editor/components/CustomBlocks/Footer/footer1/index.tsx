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

export type ITopBar1 = IBlockData<
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

export const TopBar1 = createCustomBlock<ITopBar1>({
  name: 'Footer 1',
  type: CustomBlocksType.TOPBAR_1,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: (payload: any) => {
    const defaultData: ITopBar1 = {
      type: CustomBlocksType.TOPBAR_1,
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
                attributes: {},
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
                attributes: {},
              },],
              data: {
                value: {

                },
              },
              attributes: {},
            },
            {
              type: BasicType.COLUMN,
              children: [
                {
                  type: BasicType.TEXT,
                  children: [],
                  data: {
                    value: {

                    }
                  },
                  attributes: {

                  }
                },
              ],
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
                attributes: {},
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
                attributes: {},
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
