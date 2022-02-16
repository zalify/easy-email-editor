
import { IButton, ICarousel, IDivider, IImage, INavbar, ISpacer, IText, IAccordion, ISocial } from '../../standard';
import { AdvancedType, BasicType } from '@core/constants';
import { generateAdvancedContentBlock } from '../generateAdvancedContentBlock';

export const AdvancedText = generateAdvancedContentBlock<IText>({
  type: AdvancedType.TEXT,
  baseType: BasicType.TEXT
});

export const AdvancedButton = generateAdvancedContentBlock<IButton>({
  type: AdvancedType.BUTTON,
  baseType: BasicType.BUTTON
});

export const AdvancedImage = generateAdvancedContentBlock<IImage>({
  type: AdvancedType.IMAGE,
  baseType: BasicType.IMAGE
});

export const AdvancedDivider = generateAdvancedContentBlock<IDivider>({
  type: AdvancedType.DIVIDER,
  baseType: BasicType.DIVIDER
});

export const AdvancedSpacer = generateAdvancedContentBlock<ISpacer>({
  type: AdvancedType.SPACER,
  baseType: BasicType.SPACER
});

export const AdvancedNavbar = generateAdvancedContentBlock<INavbar>({
  type: AdvancedType.NAVBAR,
  baseType: BasicType.NAVBAR
});

export const AdvancedAccordion = generateAdvancedContentBlock<IAccordion>({
  type: AdvancedType.ACCORDION,
  baseType: BasicType.ACCORDION
});

export const AdvancedCarousel = generateAdvancedContentBlock<ICarousel>({
  type: AdvancedType.CAROUSEL,
  baseType: BasicType.CAROUSEL
});

export const AdvancedSocial = generateAdvancedContentBlock<ISocial>({
  type: AdvancedType.SOCIAL,
  baseType: BasicType.SOCIAL
});
