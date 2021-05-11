import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
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

export const Carousel: IBlock<ICarousel> = {
  name: 'Carousel',
  type: BasicType.CAROUSEL,
  Panel,
  createInstance,
  validParentType: [BasicType.COLUMN],
};
