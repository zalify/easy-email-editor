import { BlockManager } from 'easy-email-core';
import {
  BlockAttributeConfigurationManager,
  BlockMarketManager,
} from 'easy-email-extensions';
import { CustomBlocksType } from './constants';
import {
  Panel as ProductRecommendationPanel,
  ProductRecommendation,
} from './ProductRecommendation';
import { Example as ProductRecommendationExample } from './ProductRecommendation/Example';
import { ListWrapper, ListSection, ListGroup, ListColumn } from './SourceList';
import { Panel as SourceListPanel } from './SourceList/Panel';
import { Example as SourceListExample } from './SourceList/Example';
import React from 'react';

BlockManager.registerBlocks({
  ProductRecommendation: ProductRecommendation,
  ListWrapper,
  ListSection,
  ListGroup,
  ListColumn,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
  [CustomBlocksType.LIST_WRAPPER]: SourceListPanel,
  [CustomBlocksType.LIST_SECTION]: SourceListPanel,
  [CustomBlocksType.LIST_GROUP]: SourceListPanel,
  [CustomBlocksType.LIST_COLUMN]: SourceListPanel,
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
        component: ProductRecommendationExample,
        thumbnail:
          'https://assets.maocanhua.cn/c160738b-db01-4081-89e5-e35bd3a34470-image.png',
      },
      ...[
        CustomBlocksType.LIST_WRAPPER,
        CustomBlocksType.LIST_SECTION,
        CustomBlocksType.LIST_GROUP,
        CustomBlocksType.LIST_COLUMN,
      ].map((item) => {
        const block = BlockManager.getBlockByType(item);
        return {
          type: CustomBlocksType.LIST_WRAPPER,
          title: block.name,
          description: 'An custom block',
          component: () => <SourceListExample type={block.type} />,
          thumbnail:
            'https://assets.maocanhua.cn/c160738b-db01-4081-89e5-e35bd3a34470-image.png',
        };
      }),
    ],
  },
]);
