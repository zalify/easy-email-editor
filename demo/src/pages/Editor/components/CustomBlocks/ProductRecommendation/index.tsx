import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  getPreviewClassName,
  AdvancedType,
  mergeBlock,
} from 'easy-email-core';

import { CustomBlocksType } from '../constants';
import React from 'react';
import { getContentEditableClassName } from 'easy-email-editor';

const { Column, Section, Wrapper, Text, Button, Image, Group } = components;

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
    quantity: number;
  }
>;

const productPlaceholder = {
  image: 'https://assets.maocanhua.cn/8e0e07e2-3f84-4426-84c1-2add355c558b-image.png',
  title: 'Red Flock Buckle Winter Boots',
  price: '$59.99 HKD',
  url: 'https://easy-email-m-ryan.vercel.app',
};

export const ProductRecommendation = createCustomBlock<IProductRecommendation>({
  name: 'Product recommendation',
  type: CustomBlocksType.PRODUCT_RECOMMENDATION,
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  create: payload => {
    const defaultData: IProductRecommendation = {
      type: CustomBlocksType.PRODUCT_RECOMMENDATION,
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
          type: BasicType.TEXT,
          children: [],
          data: {
            value: {
              content: 'custom block title',
            },
          },
          attributes: {},
        },
      ],
    };
    return mergeBlock(defaultData, payload);
  },
  render: ({ data, idx, mode, context, dataSource }) => {
    const { title, buttonText, quantity } = data.data.value;
    const attributes = data.attributes;

    const productList =
      mode === 'testing'
        ? new Array(quantity).fill(productPlaceholder)
        : (dataSource?.product_list || []).slice(0, quantity);

    const perWidth = quantity <= 3 ? '' : '33.33%';

    return (
      <Wrapper
        // add class name when testing preview
        css-class={mode === 'testing' ? getPreviewClassName(idx, data.type) : ''}
        padding='20px 0px 20px 0px'
        border='none'
        direction='ltr'
        text-align='center'
        background-color={attributes['background-color']}
      >
        <Section padding='0px'>
          <Column
            padding='0px'
            border='none'
            vertical-align='top'
          >
            <Text
              font-size='20px'
              padding='10px 25px 10px 25px'
              line-height='1'
              align='center'
              font-weight='bold'
              color={attributes['title-color']}
              css-class={getContentEditableClassName(
                BasicType.TEXT,
                `${idx}.data.value.title`,
              ).join(' ')}
            >
              {title}
            </Text>
          </Column>
        </Section>

        <Section padding='0px'>
          <Group
            vertical-align='top'
            direction='ltr'
          >
            {productList.map((item, index) => (
              <Column
                key={index}
                width={perWidth}
                padding='0px'
                border='none'
                vertical-align='top'
              >
                <Image
                  align='center'
                  height='auto'
                  padding='10px'
                  width='150px'
                  src={item.image}
                />
                <Text
                  font-size='12px'
                  padding='10px 0px 10px 0px '
                  line-height='1'
                  align='center'
                  color={attributes['product-name-color']}
                >
                  {item.title}
                </Text>
                <Text
                  font-size='12px'
                  padding='0px'
                  line-height='1'
                  align='center'
                  color={attributes['product-price-color']}
                >
                  {item.price}
                </Text>
                <Button
                  align='center'
                  padding='15px 0px'
                  background-color={attributes['button-color']}
                  color={attributes['button-text-color']}
                  target='_blank'
                  vertical-align='middle'
                  border='none'
                  text-align='center'
                  href={item.url}
                >
                  {buttonText}
                </Button>
              </Column>
            ))}
          </Group>
        </Section>
      </Wrapper>
    );
  },
});

export { Panel } from './Panel';
