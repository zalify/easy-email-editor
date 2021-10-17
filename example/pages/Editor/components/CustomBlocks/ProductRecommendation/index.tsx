import { Panel } from './Panel';
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
  createCustomBlock,
} from 'easy-email-editor';
import { CustomBlocksType } from '../constants';
import React from 'react';
import { merge } from 'lodash';

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

export const ProductRecommendation = createCustomBlock<IProductRecommendation>({
  name: 'Product recommendation',
  type: CustomBlocksType.PRODUCT_RECOMMENDATION as any,
  Panel,
  validParentType: [BasicType.PAGE],
  create: (payload) => {
    const defaultData: IProductRecommendation = {
      type: CustomBlocksType.PRODUCT_RECOMMENDATION as any,
      data: {
        value: {
          title: 'You might also like',
          buttonText: 'Buy now',
          productList: [
            {
              image:
                'https://assets.maocanhua.cn/8e0e07e2-3f84-4426-84c1-2add355c558b-image.png',
              title: 'Red Flock Buckle Winter Boots',
              price: '$59.99 HKD',
              url: 'https://easy-email-m-ryan.vercel.app',
            },
            {
              image:
                'https://assets.maocanhua.cn/8e0e07e2-3f84-4426-84c1-2add355c558b-image.png',
              title: 'Thick Stretch Warm Fleece High Waist Pencil Pant',
              price: '$69.99 HKD',
              url: 'https://easy-email-m-ryan.vercel.app',
            },
            {
              image:
                'https://assets.maocanhua.cn/8e0e07e2-3f84-4426-84c1-2add355c558b-image.png',
              title: 'Thick Velvet Grid Pant',
              price: '$29.99 HKD',
              url: 'https://easy-email-m-ryan.vercel.app',
            },
          ],
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
      children: [],
    };
    return merge(defaultData, payload);
  },
  render: (data) => {
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
                  padding="15px 0px"
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
