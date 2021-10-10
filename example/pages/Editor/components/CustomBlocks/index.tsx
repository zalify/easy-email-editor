import { BlockMarketCategory, BlocksMap } from 'easy-email-editor';
import { CustomBlocksType } from './constants';
import { ProductRecommendation } from './ProductRecommendation';
import { Example } from './ProductRecommendation/Example';

BlocksMap.registerBlocks({ ProductRecommendation: ProductRecommendation });

export const customBlocks: BlockMarketCategory = {
  title: 'Custom',
  name: 'Custom',
  blocks: [
    {
      type: CustomBlocksType.PRODUCT_RECOMMENDATION as any,
      title: ProductRecommendation.name,
      description: 'An custom block',
      ExampleComponent: Example,
      thumbnail: 'https://assets.maocanhua.cn/c160738b-db01-4081-89e5-e35bd3a34470-image.png'
    },
  ]
};