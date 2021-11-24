import { BlockManager } from 'easy-email-core';
import { BlockAttributeConfigurationManager, BlockMarketManager } from 'easy-email-extensions';
import { CustomBlocksType } from './constants';
import { Panel, ProductRecommendation } from './ProductRecommendation';
import { Example } from './ProductRecommendation/Example';


BlockManager.registerBlocks({
  ProductRecommendation: ProductRecommendation,
});


BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: Panel
});

BlockMarketManager.addCategories([
  {
    title: 'Custom',
    name: 'Custom',
    blocks: [
      {
        type: CustomBlocksType.PRODUCT_RECOMMENDATION,
        title: ProductRecommendation.name,
        description: 'An custom block',
        component: Example,
        thumbnail:
          'https://assets.maocanhua.cn/c160738b-db01-4081-89e5-e35bd3a34470-image.png',
      },
    ],
  }
]);
