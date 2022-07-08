import { IPage, Page } from './Page';
import { ISection, Section } from './Section';
import { Column, IColumn } from './Column';
import { IText, Text } from './Text';
import { IImage, Image } from './Image';
import { Group, IGroup } from './Group';
import { Button, IButton } from './Button';
import { Divider, IDivider } from './Divider';
import { IWrapper, Wrapper } from './Wrapper';
import { ISpacer, Spacer } from './Spacer';
import { Carousel, ICarousel } from './Carousel';
import { Hero, IHero } from './Hero';
import { Navbar, INavbar } from './Navbar';
import { ISocial, Social } from './Social';
import { Raw, IRaw } from './Raw';
import { Template, ITemplate } from './Template';

import { Accordion, IAccordion } from './Accordion';
import { AccordionElement, IAccordionElement } from './AccordionElement';
import { AccordionTitle, IAccordionTitle } from './AccordionTitle';
import { AccordionText, IAccordionText } from './AccordionText';
import { Table, ITable } from './Table';
import { BasicType } from '@core/constants';

export const standardBlocks = {
  [BasicType.PAGE]: Page,
  [BasicType.SECTION]: Section,
  [BasicType.COLUMN]: Column,
  [BasicType.TEXT]: Text,
  [BasicType.IMAGE]: Image,
  [BasicType.GROUP]: Group,
  [BasicType.BUTTON]: Button,
  [BasicType.DIVIDER]: Divider,
  [BasicType.WRAPPER]: Wrapper,
  [BasicType.SPACER]: Spacer,
  [BasicType.RAW]: Raw,
  [BasicType.CAROUSEL]: Carousel,
  [BasicType.HERO]: Hero,
  [BasicType.NAVBAR]: Navbar,
  [BasicType.SOCIAL]: Social,

  // spacial block, render string
  [BasicType.TEMPLATE]: Template,

  // TODO:

  [BasicType.ACCORDION]: Accordion,
  [BasicType.ACCORDION_ELEMENT]: AccordionElement,
  [BasicType.ACCORDION_TITLE]: AccordionTitle,
  [BasicType.ACCORDION_TEXT]: AccordionText,

  [BasicType.TABLE]: Table,
};

export type {
  IPage,
  ISection,
  IWrapper,
  IColumn,
  IGroup,
  IText,
  ITable,
  IImage,
  IButton,
  IDivider,
  ISpacer,
  ICarousel,
  IHero,
  ISocial,
  INavbar,
  IRaw,
  IAccordion,
  IAccordionElement,
  IAccordionTitle,
  IAccordionText,
  ITemplate,
};
