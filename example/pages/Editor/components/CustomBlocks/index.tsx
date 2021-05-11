import { BlockGroup, BlocksMap } from 'easy-email-editor';
import { ProductRecommendation } from './ProductRecommendation';

BlocksMap.registerBlocks({ ProductRecommendation: ProductRecommendation });

export const customBlocks: BlockGroup = {
  title: 'Custom blocks',
  blocks: [
    {
      label: ProductRecommendation.name,
      data: ProductRecommendation.createInstance(),
      thumbnail:
        'https://assets.maocanhua.cn/c160738b-db01-4081-89e5-e35bd3a34470-image.png',
    },
  ],
};
