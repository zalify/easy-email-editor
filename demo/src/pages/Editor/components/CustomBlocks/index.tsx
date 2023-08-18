import { BlockManager } from 'easy-email-core';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import { CustomBlocksType } from './constants';
import { Panel as ProductRecommendationPanel, ProductRecommendation } from './ProductRecommendation';
import { TopBar1 } from './TopBar/topbar1';
import { Panel as TopBarPanel1 } from './TopBar/topbar1/panel';
import { Body1 } from './Body/body1';
import { Body2 } from './Body/body2';
import { TopBar2 } from './TopBar/topbar2';
import { Footer1 } from './Footer/footer1';

BlockManager.registerBlocks({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendation,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
});
