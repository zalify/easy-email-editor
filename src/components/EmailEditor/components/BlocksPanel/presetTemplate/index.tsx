import { BasicType } from '@/constants';
import { TextBlockItem } from './TextBlockItem';
import { ImageBlockItem } from './ImageBlockItem';
import { SpacerBlockItem } from './SpacerBlockItem';
import { DividerBlockItem } from './DividerBlockItem';
import { HeroBlockItem } from './HeroBlockItem';
import { ButtonBlockItem } from './ButtonBlockItem';
import { AccordionBlockItem } from './AccordionBlockItem';
import { CarouselBlockItem } from './CarouselBlockItem';
import { NavbarBlockItem } from './NavbarBlockItem';

export const presetTemplate = {
  [BasicType.TEXT]: TextBlockItem,
  [BasicType.IMAGE]: ImageBlockItem,
  [BasicType.SPACER]: SpacerBlockItem,
  [BasicType.DIVIDER]: DividerBlockItem,
  [BasicType.BUTTON]: ButtonBlockItem,
  [BasicType.HERO]: HeroBlockItem,
  [BasicType.ACCORDION]: AccordionBlockItem,
  [BasicType.CAROUSEL]: CarouselBlockItem,
  [BasicType.NAVBAR]: NavbarBlockItem,
};
