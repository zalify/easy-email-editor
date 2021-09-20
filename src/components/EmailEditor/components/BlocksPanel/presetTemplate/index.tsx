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
import { SocialBlockItem } from './SocialBlockItem';
import { WrapperBlockItem } from './WrapperBlockItem';
import { SectionBlockItem } from './SectionBlockItem';
import { GroupBlockItem } from './GroupBlockItem';
import { ColumnBlockItem } from './ColumnBlockItem';

export const presetTemplate = {
  // content blocks
  [BasicType.TEXT]: TextBlockItem,
  [BasicType.IMAGE]: ImageBlockItem,
  [BasicType.SPACER]: SpacerBlockItem,
  [BasicType.DIVIDER]: DividerBlockItem,
  [BasicType.BUTTON]: ButtonBlockItem,
  [BasicType.HERO]: HeroBlockItem,
  [BasicType.NAVBAR]: NavbarBlockItem,
  [BasicType.ACCORDION]: AccordionBlockItem,
  [BasicType.CAROUSEL]: CarouselBlockItem,
  [BasicType.SOCIAL]: SocialBlockItem,

  // layout blocks
  [BasicType.WRAPPER]: WrapperBlockItem,
  [BasicType.SECTION]: SectionBlockItem,
  [BasicType.GROUP]: GroupBlockItem,
  [BasicType.COLUMN]: ColumnBlockItem,
};
