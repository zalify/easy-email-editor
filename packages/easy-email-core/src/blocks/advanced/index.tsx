import { AdvancedType } from '@core/constants';
import { BlockManager } from '@core/utils/BlockManager';
import { AdvancedText, AdvancedButton, AdvancedImage, AdvancedDivider, AdvancedSpacer, AdvancedNavbar, AdvancedAccordion, AdvancedCarousel } from './blocks';

BlockManager.registerBlocks({
  [AdvancedType.TEXT]: AdvancedText,
  [AdvancedType.BUTTON]: AdvancedButton,
  [AdvancedType.IMAGE]: AdvancedImage,
  [AdvancedType.DIVIDER]: AdvancedDivider,
  [AdvancedType.SPACER]: AdvancedSpacer,
  [AdvancedType.NAVBAR]: AdvancedNavbar,
  [AdvancedType.ACCORDION]: AdvancedAccordion,
  [AdvancedType.CAROUSEL]: AdvancedCarousel,
});
