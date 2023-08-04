import { BlockManager } from 'easy-email-core';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import { CustomBlocksType } from './constants';
import { Panel as ProductRecommendationPanel, ProductRecommendation } from './ProductRecommendation';
import { TopBar1 } from './TopBar/topbar1';
import { TopbarPanel1 } from './TopBar/topbar1/panel';
import { Body1 } from './Body/body1';
import { Body2 } from './Body/body2';
import { TopBar2 } from './TopBar/topbar2';
import { Footer1 } from './Footer/footer1';

BlockManager.registerBlocks({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendation,
  [CustomBlocksType.TOPBAR_1]: TopBar1,
  [CustomBlocksType.TOPBAR_2]: TopBar2,
  [CustomBlocksType.BODY_1]: Body1,
  [CustomBlocksType.BODY_2]: Body2,
  [CustomBlocksType.FOOTER_1]: Footer1
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
  [CustomBlocksType.TOPBAR_1]: TopbarPanel1
});
