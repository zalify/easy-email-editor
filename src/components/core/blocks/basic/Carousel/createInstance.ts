import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ICarousel } from '.';

export const createInstance: CreateInstance<ICarousel> = (payload) => {
  const defaultData: ICarousel = {
    type: BasicType.CAROUSEL,
    data: {
      value: {
        images: [
          {
            src:
              'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
            target: '_blank',
          },
          {
            src: 'https://www.mailjet.com/wp-content/uploads/2016/09/3@1x.png',
            target: '_blank',
          },
          {
            src: 'https://www.mailjet.com/wp-content/uploads/2016/09/1@1x.png',
            target: '_blank',
          },
        ],
      },
    },
    attributes: {
      align: 'center',
      'left-icon': 'https://i.imgur.com/xTh3hln.png',
      'right-icon': 'https://i.imgur.com/os7o9kz.png',
      'icon-width': '44px',
      thumbnails: 'visible',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
