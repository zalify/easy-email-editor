import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData, BasicType, BlocksMap } from 'easy-email-editor';
import { CustomBlocksType } from '../constants';
export type IProductRecommendation = IBlockData<
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
    productList: Array<{
      image: string;
      title: string;
      price: string;
      url: string;
    }>;
  }
>;

const transform = (data: IProductRecommendation) => {
  const { title, productList, buttonText } = data.data.value;
  const attributes = data.attributes;

  const [Wrapper, Section, Group, Column, Image, Text, Button] = [
    BlocksMap.getBlock('Wrapper'),
    BlocksMap.getBlock('Section'),
    BlocksMap.getBlock('Group'),
    BlocksMap.getBlock('Column'),
    BlocksMap.getBlock('Image'),
    BlocksMap.getBlock('Text'),
    BlocksMap.getBlock('Button'),
  ];

  const instance = Wrapper.createInstance({
    attributes: {
      'background-color': attributes['background-color'],
    },
    children: [
      Section.createInstance({
        attributes: {
          padding: '0px 0px 0px 0px',
        },
        children: [
          Column.createInstance({
            children: [
              Text.createInstance({
                data: {
                  value: {
                    content: title,
                  },
                },
                attributes: {
                  'font-size': '20px',
                  padding: '10px 25px 10px 25px',
                  'line-height': '1',
                  align: 'center',
                  'font-weight': 'bold',
                  color: attributes['title-color'],
                },
              }),
            ],
          }),
        ],
      }),
      Section.createInstance({
        attributes: {
          padding: '0px 0px 0px 0px',
        },
        children: [
          Group.createInstance({
            children: productList.map((product) =>
              Column.createInstance({
                children: [
                  Image.createInstance({
                    attributes: {
                      align: 'center',
                      height: 'auto',
                      padding: '10px 10px 10px 10px',
                      src: product.image,
                    },
                  }),
                ],
              })
            ),
          }),
        ],
      }),
      Section.createInstance({
        attributes: {
          padding: '0px 0px 0px 0px',
        },
        children: [
          Group.createInstance({
            children: productList.map((product) =>
              Column.createInstance({
                children: [
                  Text.createInstance({
                    type: 'text',
                    data: {
                      value: {
                        content: product.title,
                      },
                    },
                    attributes: {
                      color: attributes['product-name-color'],
                      'font-size': '12px',
                      padding: '10px 0px 10px 0px ',
                      'line-height': '1',
                      align: 'center',
                    },
                  }),
                ],
              })
            ),
          }),
        ],
      }),
      Section.createInstance({
        attributes: {
          padding: '0px 0px 0px 0px',
        },
        children: [
          Group.createInstance({
            children: productList.map((product) =>
              Column.createInstance({
                children: [
                  Text.createInstance({
                    type: 'text',
                    data: {
                      value: {
                        content: product.price,
                      },
                    },
                    attributes: {
                      color: attributes['product-price-color'],
                      'font-size': '12px',
                      padding: '0px',
                      'line-height': '1',
                      align: 'center',
                    },
                  }),
                ],
              })
            ),
          }),
        ],
      }),

      Section.createInstance({
        attributes: {
          padding: '0px 0px 0px 0px',
        },
        children: [
          Group.createInstance({
            children: productList.map((product) =>
              Column.createInstance({
                children: [
                  Button.createInstance({
                    data: {
                      value: {
                        content: buttonText,
                      },
                    },
                    attributes: {
                      align: 'center',
                      'background-color': attributes['button-color'],
                      color: attributes['button-text-color'],
                      'font-size': '12px',
                      'font-weight': 'normal',
                      'border-radius': '3px',
                      padding: '10px 10px 10px 10px',
                      'inner-padding': '10px 25px 10px 25px',
                      'line-height': '120%',
                      target: '_blank',
                      'vertical-align': 'middle',
                      border: 'none',
                      'text-align': 'center',
                      href: product.url,
                    },
                  }),
                ],
              })
            ),
          }),
        ],
      }),
    ],
  });

  return instance;
};

export const ProductRecommendation: IBlock = {
  name: 'Product recommendation',
  type: CustomBlocksType.PRODUCT_RECOMMENDATION,
  Panel,
  createInstance,
  validParentType: [BasicType.PAGE],
  transform,
};
