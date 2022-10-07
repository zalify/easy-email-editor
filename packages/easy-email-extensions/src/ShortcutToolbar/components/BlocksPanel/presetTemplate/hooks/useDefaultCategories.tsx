import React, { useMemo } from 'react';
import { useTranslation } from '@extensions/hooks/useTranslation';
import { AdvancedType } from '@core';
import { TextBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/TextBlockItem';
import { Stack, TextStyle } from 'easy-email-editor';
import { ImageBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/ImageBlockItem';
import { ButtonBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/ButtonBlockItem';
import { HeroBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/HeroBlockItem';
import { NavbarBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/NavbarBlockItem';
import { SpacerBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/SpacerBlockItem';
import { DividerBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/DividerBlockItem';
import {
  AccordionBlockItem
} from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/AccordionBlockItem';
import { CarouselBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/CarouselBlockItem';
import { SocialBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/SocialBlockItem';
import { WrapperBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/WrapperBlockItem';
import { SectionBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/SectionBlockItem';
import { GroupBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/GroupBlockItem';
import { ColumnBlockItem } from '@extensions/ShortcutToolbar/components/BlocksPanel/presetTemplate/ColumnBlockItem';

export const useDefaultCategories = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        title: t('categories.content'),
        name: 'CONTENT',
        blocks: [
          {
            type: AdvancedType.TEXT,
            title: t('categories.text'),
            description: t('categories.textDescription'),
            component: TextBlockItem,
          },
          {
            type: AdvancedType.IMAGE,
            title: t('categories.image'),
            description: (
              <Stack vertical spacing='none'>
                <TextStyle>
                  {t('categories.imageDescription')}
                </TextStyle>
              </Stack>
            ),
            component: ImageBlockItem,
          },
          {
            type: AdvancedType.BUTTON,
            title:  t('categories.button'),
            description:  t('categories.buttonDescription'),
            component: ButtonBlockItem,
          },
          {
            type: AdvancedType.HERO,
            title:  t('categories.hero'),
            description: t('categories.heroDescription'),
            component: HeroBlockItem,
          },
          {
            type: AdvancedType.NAVBAR,
            title: t('categories.navbar'),
            description: t('categories.navbarDescription'),
            component: NavbarBlockItem,
          },
          {
            type: AdvancedType.SPACER,
            title: t('categories.spacer'),
            description: t('categories.spacerDescription'),
            component: SpacerBlockItem,
          },
          {
            type: AdvancedType.DIVIDER,
            title: t('categories.divider'),
            description: t('categories.dividerDescription'),
            component: DividerBlockItem,
          },
          {
            type: AdvancedType.ACCORDION,
            title: t('categories.accordion'),
            description: t('categories.accordionDescription'),
            component: AccordionBlockItem,
          },
          {
            type: AdvancedType.CAROUSEL,
            title: t('categories.carouser'),
            description: t('categories.carouserDescription'),
            component: CarouselBlockItem,
          },
          {
            type: AdvancedType.SOCIAL,
            title: t('categories.social'),
            description:  t('categories.socialDescription'),
            component: SocialBlockItem,
          },
        ],
      },
      {
        title:  t('categories.layout'),
        name: 'LAYOUT',
        blocks: [
          {
            type: AdvancedType.WRAPPER,
            title: t('categories.wrapper'),
            description: t('categories.wrapperDescription'),
            component: WrapperBlockItem,
          },
          {
            type: AdvancedType.SECTION,
            title: t('categories.section'),
            description: (
              <Stack vertical spacing='none'>
                <TextStyle>
                  {t('categories.sectionDescription1')}
                </TextStyle>
                <TextStyle>
                  {t('categories.sectionDescription2')}
                </TextStyle>
              </Stack>
            ),
            component: SectionBlockItem,
          },
          {
            type: AdvancedType.GROUP,
            title: t('categories.group'),
            description:  t('categories.groupDescription'),
            component: GroupBlockItem,
          },
          {
            type: AdvancedType.COLUMN,
            title:  t('categories.column'),
            description: (
              <Stack vertical spacing='none'>
                <TextStyle>
                  {t('categories.columnDescription1')}
                </TextStyle>
                <TextStyle>
                  {t('categories.columnDescription2')}
                </TextStyle>
              </Stack>
            ),
            component: ColumnBlockItem,
          },
        ],
      },
    ];
  }, [t]);
}