import { AdvancedType } from '@core/constants';
import {
  AdvancedText,
  AdvancedButton,
  AdvancedImage,
  AdvancedDivider,
  AdvancedSpacer,
  AdvancedNavbar,
  AdvancedAccordion,
  AdvancedCarousel,
  AdvancedSocial,
  AdvancedWrapper,
  AdvancedSection,
  AdvancedGroup,
  AdvancedColumn,
} from './blocks';

export const advancedBlocks = {
  [AdvancedType.TEXT]: AdvancedText,
  [AdvancedType.BUTTON]: AdvancedButton,
  [AdvancedType.IMAGE]: AdvancedImage,
  [AdvancedType.DIVIDER]: AdvancedDivider,
  [AdvancedType.SPACER]: AdvancedSpacer,
  [AdvancedType.NAVBAR]: AdvancedNavbar,
  [AdvancedType.ACCORDION]: AdvancedAccordion,
  [AdvancedType.CAROUSEL]: AdvancedCarousel,
  [AdvancedType.SOCIAL]: AdvancedSocial,

  [AdvancedType.WRAPPER]: AdvancedWrapper,
  [AdvancedType.SECTION]: AdvancedSection,
  [AdvancedType.GROUP]: AdvancedGroup,
  [AdvancedType.COLUMN]: AdvancedColumn,
};
