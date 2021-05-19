import { CreateInstance } from 'easy-email-editor';
import { merge } from 'lodash';
import { IProductRecommendation } from '.';
import { CustomBlocksType } from '../constants';

export const createInstance: CreateInstance<IProductRecommendation> = (
  payload
) => {
  const defaultData: IProductRecommendation = {
    type: CustomBlocksType.PRODUCT_RECOMMENDATION,
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
};
