
import { IButton, ICarousel, IDivider, IImage, INavbar, ISpacer, IText } from '@core';
import { IAccordion } from '@core/blocks/Accordion';
import { AdvancedType, BasicType } from '@core/constants';
import { generateAdvancedBlock } from '../generateAdvancedBlock';

export const AdvancedText = generateAdvancedBlock<IText>({
  type: AdvancedType.TEXT,
  baseType: BasicType.TEXT
});

export const AdvancedButton = generateAdvancedBlock<IButton>({
  type: AdvancedType.BUTTON,
  baseType: BasicType.BUTTON
});

export const AdvancedImage = generateAdvancedBlock<IImage>({
  type: AdvancedType.IMAGE,
  baseType: BasicType.IMAGE
});

export const AdvancedDivider = generateAdvancedBlock<IDivider>({
  type: AdvancedType.DIVIDER,
  baseType: BasicType.DIVIDER
});

export const AdvancedSpacer = generateAdvancedBlock<ISpacer>({
  type: AdvancedType.SPACER,
  baseType: BasicType.SPACER
});

export const AdvancedNavbar = generateAdvancedBlock<INavbar>({
  type: AdvancedType.NAVBAR,
  baseType: BasicType.NAVBAR
});

export const AdvancedAccordion = generateAdvancedBlock<IAccordion>({
  type: AdvancedType.ACCORDION,
  baseType: BasicType.ACCORDION
});

export const AdvancedCarousel = generateAdvancedBlock<ICarousel>({
  type: AdvancedType.CAROUSEL,
  baseType: BasicType.CAROUSEL
});

