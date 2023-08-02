import { BlockManager } from 'easy-email-core';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import { CustomBlocksType } from './constants';
import { Panel as ProductRecommendationPanel, ProductRecommendation } from './ProductRecommendation';
import { TopBar1 } from './TopBar';
import { TopbarPanel1 } from './TopBar/panel';
import { Body1 } from './Body';

BlockManager.registerBlocks({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendation,
  [CustomBlocksType.TOPBAR_1]: TopBar1,
  [CustomBlocksType.BODY_1]: Body1
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
  [CustomBlocksType.TOPBAR_1]: TopbarPanel1
});
