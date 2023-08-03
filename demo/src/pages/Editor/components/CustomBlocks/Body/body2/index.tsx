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

export type IBody = IBlockData<
  {
    'background-color'?: string;
    'background-height'?: string;
    'background-position'?: string;
    'background-url'?: string;
    'background-width'?: string;
    'vertical-align'?: string;
    'border-radius'?: string;
    align?:string;
    width?: string;
    height?: string;
    mode: 'fluid-height' | 'fixed-height';
    padding?: string;
  }
>;

export const Body2 = createCustomBlock<IBody>({
  name: 'Body 2',
  type: CustomBlocksType.BODY_2,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: (payload:any) => {
    const defaultData: IBody ={
      type: CustomBlocksType.BODY_2,
      data: {
        value: {},
      },
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        align:'center',
        padding: '10px 0px 10px 0px',
        'vertical-align': 'top',
      },
      children: [
        {
          type: 'text',
          data: {
            value: {
              content: 'We Serve Healthy &amp; Delicious Foods',
            },
          },
          attributes: {
            padding: '10px 25px 10px 25px',
            align: 'center',
            'font-size': '45px',
            'line-height': '45px',
          },
          children: [],
        },
        {
          type: 'image',
          data: {
            value: {
              content: 'We Serve Healthy &amp; Delicious Foods',
            },
          },
          attributes: {
            padding: '20px 0px 20px 0px',
            align: 'center',
            src:'https://plus.unsplash.com/premium_photo-1669115117999-5c2a1fdba0ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',

          },
          children: [],
        },
        {
          type: 'button',
          data: {
            value: {
              content: 'Get Your Order Here!',
            },
          },
          attributes: {
            align: 'center',
            'background-color': '#f3a333',
            color: '#ffffff',
            'font-size': '13px',
            'font-weight': 'normal',
            'border-radius': '30px',
            padding: '10px 0px 10px 0px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '120%',
            target: '_blank',
            'vertical-align': 'middle',
            border: 'none',
            'text-align': 'center',
            href: '#',
          },
          children: [],
        },
      ],
    }
    return mergeBlock(defaultData, payload);
  },
  render: (params: any) => {
    const { data, idx, mode, context, dataSource } = params;

    return (
      <BasicBlock tag='mj-section' params={params}></BasicBlock>
    );
  },
});
