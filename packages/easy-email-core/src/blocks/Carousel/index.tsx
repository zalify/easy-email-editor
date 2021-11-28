import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
export type ICarousel = IBlockData<
  {
    align?: string;
    'background-color'?: string;
    'border-radius'?: string;
    'icon-width'?: string;
    'left-icon'?: string;
    'right-icon'?: string;
    'tb-border'?: string;
    'tb-border-radius'?: string;
    'tb-hover-border-color'?: string;
    'tb-selected-border-color'?: string;
    'tb-width'?: string;
    thumbnails?: string;
  },
  {
    images: Array<{
      src: string;
      target: string;
      href?: string;
      'thumbnails-src'?: string;
      title?: string;
      rel?: string;
      alt?: string;
    }>;
  }
>;

export const Carousel = createBlock<ICarousel>({
  name: 'Carousel',
  type: BasicType.CAROUSEL,
  create: (payload) => {
    const defaultData: ICarousel = {
      type: BasicType.CAROUSEL,
      data: {
        value: {
          images: [
            {
              src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
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
  },
  validParentType: [BasicType.COLUMN],
});
