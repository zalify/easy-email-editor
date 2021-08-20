import { Panel } from './Panel';
import { createInstance } from './createInstance';
import {
  IBlock,
  IBlockData,
  BasicType,
  Column,
  Section,
  Wrapper,
  Text,
  Button,
  Image,
  Group,
} from 'easy-email-editor';
import { CustomBlocksType } from '../constants';
import React from 'react';

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

  return (
    <Wrapper
      padding='20px 0px 20px 0px'
      border='none'
      direction='ltr'
      text-align='center'
      background-color={attributes['background-color']}
    >
      <Section padding='0px'>
        <Column padding='0px' border='none' vertical-align='top'>
          <Text
            font-size='20px'
            padding='10px 25px 10px 25px'
            line-height='1'
            align='center'
            font-weight='bold'
            color={attributes['title-color']}
          >
            {title}
          </Text>
        </Column>
      </Section>

      <Section padding='0px'>
        <Group vertical-align='top' direction='ltr'>
          {productList.map((item, index) => (
            <Column
              key={index}
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
            </Column>
          ))}
        </Group>
      </Section>

      <Section padding='0px'>
        <Group vertical-align='top' direction='ltr'>
          {productList.map((item, index) => (
            <Column
              key={index}
              padding='0px'
              border='none'
              vertical-align='top'
            >
              <Text
                font-size='12px'
                padding='10px 0px 10px 0px '
                line-height='1'
                align='center'
                color={attributes['product-name-color']}
              >
                {item.title}
              </Text>
            </Column>
          ))}
        </Group>
      </Section>

      <Section padding='0px'>
        <Group vertical-align='top' direction='ltr'>
          {productList.map((item, index) => (
            <Column
              key={index}
              padding='0px'
              border='none'
              vertical-align='top'
            >
              <Text
                font-size='12px'
                padding='0px'
                line-height='1'
                align='center'
                color={attributes['product-price-color']}
              >
                {item.price}
              </Text>
            </Column>
          ))}
        </Group>
      </Section>

      <Section padding='0px'>
        <Group vertical-align='top' direction='ltr'>
          {productList.map((item, index) => (
            <Column
              key={index}
              padding='0px'
              border='none'
              vertical-align='top'
            >
              <Button
                align='center'
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
};

export const ProductRecommendation: IBlock = {
  name: 'Product recommendation',
  type: CustomBlocksType.PRODUCT_RECOMMENDATION as any,
  Panel,
  createInstance,
  validParentType: [BasicType.PAGE],
  transform,
};
