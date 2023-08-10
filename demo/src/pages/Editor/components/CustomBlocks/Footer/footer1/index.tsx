import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  mergeBlock,
} from 'easy-email-core';

import { getImg } from "easy-email-core";

import { CustomBlocksType } from '../../constants';
import React from 'react';

const { BasicBlock } = components;

export type IFooter1 = IBlockData<
  {
    'background-color': string;
    align: string;
  }
>;

export const Footer1 = createCustomBlock<IFooter1>({
  name: 'Footer 1',
  type: CustomBlocksType.FOOTER_1,
  validParentType: [BasicType.PAGE],
  create: (payload: any) => {
    const defaultData: IFooter1 = {
      type: CustomBlocksType.FOOTER_1,
      data: {
        value: {
        },
      },
      attributes: {
        'background-color': '#ffffff',
        align: 'center',
      },
      children: [
        {
          type: BasicType.SECTION,
          data: {
            value: {
            },
          },
          attributes: {

          },
          children: [
            {
              type: BasicType.COLUMN,
              data: {
                value: {},
              },
              attributes: {},
              children: [
                {
                  type: BasicType.TEXT,
                  data: {
                    value: {
                      content: 'Glue Labs Pvt. Ltd.',
                    },
                  },
                  attributes: {
                    padding: '0px 0px 0px 0px',
                    align: 'center',
                    'font-size': '25px',
                    'font-weight': '600',
                    color: 'black',
                    'line-height': '30px',
                  },
                  children: [

                  ],
                }
              ],
            }
          ],
        },
        {
          type: BasicType.SECTION,
          data: {
            value: {
            },
          },
          attributes: {
            padding: '0px 25px 0px 25px',
            align: 'center',
            'font-size': '25px',
            'line-height': '25px',
          },
          children: [
            {
              type: BasicType.GROUP,
              data: {
                value: {},
              },
              attributes: {
                width: "60%"
              },
              children: [
                {
                  type: BasicType.COLUMN,
                  data: {
                    value: {},
                  },
                  attributes: {
                    padding: '0px 0px 0px 0px',
                  },
                  children: [
                    {
                      type: BasicType.TEXT,
                      data: {
                        value: {
                          content: 'My Profile'
                        },
                      },
                      attributes: {
                        padding: '0px 0px 0px 0px',
                        align: 'center',
                        'font-size': '16px',
                        'font-weight': '400',
                        color: '#CCCCCC',
                        'line-height': '16px',
                      },
                      children: [],
                    }
                  ],
                },
                {
                  type: BasicType.COLUMN,
                  data: {
                    value: {},
                  },
                  attributes: {
                    padding: '0px 0px 0px 0px',
                  },
                  children: [
                    {
                      type: BasicType.TEXT,
                      data: {
                        value: {
                          content: 'Contact'
                        },
                      },
                      attributes: {
                        padding: '0px 0px 0px 0px',
                        align: 'center',
                        'font-size': '16px',
                        'font-weight': '400',
                        color: '#CCCCCC',
                        'line-height': '16px',
                      },
                      children: [],
                    }
                  ],
                },
                {
                  type: BasicType.COLUMN,
                  data: {
                    value: {},
                  },
                  attributes: {
                    padding: '0px 0px 0px 0px',
                  },
                  children: [
                    {
                      type: BasicType.TEXT,
                      data: {
                        value: {
                          content: 'Explore'
                        },
                      },
                      attributes: {
                        padding: '0px 0px 0px 0px',
                        align: 'center',
                        'font-size': '16px',
                        'font-weight': '400',
                        color: '#CCCCCC',
                        'line-height': '16px',
                      },
                      children: [],
                    }
                  ],
                }
              ],
            }
          ],
        },
        {
          type: BasicType.SECTION,
          data: {
            value: {
            },
          },
          attributes: {

          },
          children: [
            {
              type: BasicType.COLUMN,
              data: {
                value: {},
              },
              attributes: {},
              children: [
                {
                  type: BasicType.SOCIAL,
                  data: {
                    value: {
                      elements: [
                        {
                          href: '#',
                          target: '_blank',
                          src: getImg('IMAGE_02'),
                          content: 'Facebook',
                        },
                        {
                          href: '#',
                          target: '_blank',
                          src: getImg('IMAGE_03'),
                          content: 'Google',
                        },
                        {
                          href: '',
                          target: '_blank',
                          src: getImg('IMAGE_04'),
                          content: 'Twitter',
                        },
                      ],
                    }
                  },
                  attributes: {
                    padding: '0px 0px 0px 0px',
                    align: 'center',
                    'font-size': '25px',
                    'font-weight': '600',
                    color: 'black',
                    'line-height': '30px',
                  },
                  children: [

                  ],
                }
              ],
            }
          ],
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
