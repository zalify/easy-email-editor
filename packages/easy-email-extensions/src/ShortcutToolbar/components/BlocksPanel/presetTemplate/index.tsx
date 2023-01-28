import React from 'react';
import { AdvancedType } from 'easy-email-core';
import { Stack, TextStyle } from 'easy-email-editor';

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

export const defaultCategories = [
  {
    title: t('Content'),
    name: 'CONTENT',
    blocks: [
      {
        type: AdvancedType.TEXT,
        title: t('Text'),
        description: t('blockDescriptionText'),
        component: TextBlockItem,
      },
      {
        type: AdvancedType.IMAGE,
        title: t('Image'),
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              {t('imageDescriptionText')}
            </TextStyle>
          </Stack>
        ),
        component: ImageBlockItem,
      },
      {
        type: AdvancedType.BUTTON,
        title: t('Button'),
        description: t('buttonDescriptionText'),
        component: ButtonBlockItem,
      },
      {
        type: AdvancedType.HERO,
        title: t('Hero'),
        description: t('heroDescriptionText'),
        component: HeroBlockItem,
      },
      {
        type: AdvancedType.NAVBAR,
        title: t('Navbar'),
        description: t('navbarDescriptionText'),
        component: NavbarBlockItem,
      },
      {
        type: AdvancedType.SPACER,
        title: t('Spacer'),
        description: t('spacerDescriptionText'),
        component: SpacerBlockItem,
      },
      {
        type: AdvancedType.DIVIDER,
        title: t('Divider'),
        description: t('dividerDescriptionText'),
        component: DividerBlockItem,
      },
      {
        type: AdvancedType.ACCORDION,
        title: t('Accordion'),
        description:t('accordionDescriptionText'),
        component: AccordionBlockItem,
      },
      {
        type: AdvancedType.CAROUSEL,
        title: t('Carousel'),
        description: t('carouselDescriptionText'),
        component: CarouselBlockItem,
      },
      {
        type: AdvancedType.SOCIAL,
        title: t('Social'),
        description: t('socialDescriptionText'),
        component: SocialBlockItem,
      },
    ],
  },
  {
    title: t('Layout'),
    name: 'LAYOUT',
    blocks: [
      {
        type: AdvancedType.WRAPPER,
        title: t('Wrapper'),
        description: t("wrapperDescriptionText"),
        component: WrapperBlockItem,
      },
      {
        type: AdvancedType.SECTION,
        title: t('Section'),
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              {t('sectionDescriptionText1')}
            </TextStyle>
            <TextStyle>
             {t('sectionDescriptionText2')}
            </TextStyle>
          </Stack>
        ),
        component: SectionBlockItem,
      },
      {
        type: AdvancedType.GROUP,
        title: t('Group'),
        description: t('groupDescriptionText'),
        component: GroupBlockItem,
      },
      {
        type: AdvancedType.COLUMN,
        title: t('Column'),
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              {t(`columnDescriptionText1`)}
            </TextStyle>
            <TextStyle>
              {t('columnDescriptionText2')}
            </TextStyle>
          </Stack>
        ),
        component: ColumnBlockItem,
      },
    ],
  },
];
